/* @flow */

import type {Store, Item} from 'src/store-types';

import React, {Component} from 'react';
import {Link} from 'react-router';
import {bgImage} from 'src/services/utils';
import withStore from 'src/flux/with-store.jsx';

import css from './feed.css';

import Animation from 'src/components/animation.jsx';
import Sidebar from 'src/components/sidebar.jsx';


type Props = {
  store: Store,
};

const Feed = ({store}: Props) => (
  <div className={css.bg}>
    <div className={css.scroll}>
      <div className={css.feed}>
        { store.feed.map(id => (
          <Curve key={id} curve={store.items[id]} />
        )) }
      </div>
    </div>
  </div>
);

export default withStore()(Feed);


const step = 0.01;
const limit = 1;

class Curve extends Component {
  values = [1];

  constructor(props) {
    super(props);

    this.state = {
      animate: false,
    };

    this.handleCanvasMount = this.handleCanvasMount.bind(this);
    this.handleWorkerMessage = this.handleWorkerMessage.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    const func = `
    function ease(x) {
      ${this.props.curve.code}
    }

    self.onmessage = function (event) {
      const {step, limit} = event.data;
      let values = [];
      for (let i = 0, x = 0; x <= limit; x += step, i++) {
        values[i] = ease(x);
      }
      postMessage({values});
    }
    `;

    this.blob = new Blob([func], {type: 'application/javascript'});
    this.worker = new Worker(URL.createObjectURL(this.blob));

    //this.worker.addEventListener('message', this.handleWorkerMessage);
    this.worker.onmessage = this.handleWorkerMessage;
    this.worker.postMessage({step, limit});

    if (this.ctx) {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }
  }

  render() {
    return (
      <div className={css.curve}>
        <div className={css.name}>{this.props.curve.name}</div>
        <canvas className={css.graph} ref={this.handleCanvasMount}></canvas>
        <div className={css.graphFront} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <Animation animate={this.state.animate} duration={1000}>
            { progress => (
              <div className={css.graphDot} style={this.dotStyle(progress)}></div>
            ) }
          </Animation>
        </div>
      </div>
    );
  }

  handleCanvasMount(el) {
    this.canvas = el;

    if (el) {
      this.ctx = el.getContext('2d');
    } else {
      this.ctx = null;
    }
  }

  handleWorkerMessage(event) {
    this.values = event.data.values;
    this.draw();
  }

  handleMouseEnter() {
    this.setState({
      animate: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      animate: false,
    });
  }

  draw() {
    const {canvas, ctx, values} = this;
    const {width, height} = canvas;

    ctx.strokeStyle = 'black';

    ctx.moveTo(0, values[0] * height);
    for (let i = 1; i < values.length; i++) {
      ctx.lineTo(i * step * width, values[i] * height);
    }

    ctx.stroke();
  }

  dotStyle(progress) {
    const {values} = this;
    const x = progress * (values.length - 1);
    const floor = Math.floor(x);
    const ceil = Math.ceil(x);
    const y = (values[floor] + values[ceil]) / 2;

    const opacity = this.state.animate ? 1 : 0;

    return {
      opacity,
      top: `${y * 100}%`,
      left: `${progress * 100}%`,
    };
  }
}

const ArticleSummary = ({item}: {item: Item}) => (
  <div className={css.article}>
    <div className={css.header}>
      <div className={css.avatar}></div>
      <div className={css.headerText}>
        <div className={css.byLine}>
          Kyle Warren
        </div>
        <div className={css.info}>
          Aug 26 &middot; 2 min read
        </div>
      </div>
    </div>
    <Link className={css.text} to={`/${item.id}`}>
      { item.photo &&
        <div className={css.photo} style={bgImage(item.photo)}></div>
      }
      <h3 className={css.title}>{item.title}</h3>
      <h4 className={css.subtitle}>{item.subtitle}</h4>
      <p className={css.hint}>{item.text.split('\n')[0]}</p>
      <span className={css.more}>Read more...</span>
    </Link>
  </div>
);

