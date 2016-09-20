/* @flow */

import React, {Component, PropTypes} from 'react';


type Props = {
  store: Object,
  children: Object,
};

export default class FluxTop extends Component {
  static childContextTypes = {
    store: PropTypes.object,
  };

  props: Props;

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    return this.props.children;
  }
}

