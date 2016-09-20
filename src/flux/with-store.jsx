/**
 * withStore
 *
 * An HOC that works like a decorator.
 *
 * Inspired by react-router's withRouter.
 */

import invariant from 'invariant';
import React, {PropTypes} from 'react';
import hoistStatics from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withStore(options) {
  const withRef = options && options.withRef;

  return function (WrappedComponent) {

    const WithStore = React.createClass({
      // TODO: use actual store shape
      contextTypes: {store: PropTypes.object},
      propTypes: {router: PropTypes.object},

      getWrappedInstance() {
        invariant(
          withRef,
          'To access the wrapped instance, you need to specify ' +
          '`{ withRef: true }` as the second argument of the withRouter() call.'
        );

        return this.wrappedInstance;
      },

      render() {
        const store = this.props.store || this.context.store;
        const props = {...this.props, store};

        if (withRef) {
          props.ref = c => this.wrappedInstance = c;
        }

        return <WrappedComponent {...props} />;
      }
    })

    WithStore.displayName = `withRouter(${getDisplayName(WrappedComponent)})`;
    WithStore.WrappedComponent = WrappedComponent;

    return hoistStatics(WithStore, WrappedComponent);
  }
}

