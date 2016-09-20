import React from 'react';
import {Link} from 'react-router';
import map from 'lodash/map';
import {bgImage} from 'src/services/utils';

import css from './sidebar.css';


export default ({className, store}) => (
  <div className={className}>
    { map(store.recs, rec => (
      <section className={css.section} key={rec.slug}>
        <header>
          <div className={css.title}>{rec.title}</div>
          <div className={css.subtitle}>{rec.subtitle}</div>
        </header>
        { rec.order.map(id => (
          <Entry key={id} item={store.items[id]} />
        )) }
      </section>
    )) }
  </div>
);

const Entry = ({item}) => (
  <Link className={css.entry} to={`/${item.id}`}>
    <div className={css.avatar}></div>
    <div className={css.text}>
      <div className={css.storyTitle}>{item.title}</div>
      <div className={css.storySubtitle}>{item.author}</div>
    </div>
  </Link>
);

