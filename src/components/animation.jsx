import React, {Children, Component} from 'react';
import {forEach, remove} from 'src/services/animation-frame';


type Props = {
  animate: boolean,
  duration: number,
};

export default class Animation extends Component {
  static defaultProps = {
    animate: false,
    duration: 200,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      progress: 0,
      startTime: null,
    };

    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    if (this.props.animate) {
      this.start();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.animate && !prevProps.animate) {
      this.start();
    } else if (!this.props.animate && prevProps.animate) {
      this.stop();
    }
  }

  start() {
    forEach(this.draw);
  }

  stop() {
    this.setState({
      startTime: null,
    });
    remove(this.draw);
  }

  draw(time) {
    const {duration} = this.props;
    let {startTime} = this.state;

    console.log('drawing');

    if (startTime === null) {
      startTime = time;
      this.setState({
        startTime,
      });
    }

    let progress = (time - startTime) / duration;
    if (progress > 1) {
      progress = 1;
      this.stop();
    }

    this.setState({
      progress,
    });
  }

  render() {
    return (
      this.props.children(this.state.progress)
    );
  }
}

