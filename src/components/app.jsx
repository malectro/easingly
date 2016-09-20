/* @flow */

import React from 'react';
import {Link} from 'react-router';

import './base.global.css';
import css from './app.css';


type Props = {
  children: Object,
};

export default function App({children}: Props) {
  return <div className={css.top}>
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link to="/">
          <h1 className={css.title}>Easingly</h1>
        </Link>
        <div className={css.search}>Search</div>
      </div>
    </header>
    {children}
  </div>;
}

