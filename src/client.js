import React from 'react';
import {render} from 'react-dom';
import {Router, useRouterHistory, match} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import FluxTop from 'src/flux/top.jsx';

import store from 'src/store';
import routes from 'src/routes';


const appHistory = useScroll(useRouterHistory(createBrowserHistory))();
const appElement = document.getElementById('app');
let currentRoutes = routes;

function renderAll() {
  render((
    <FluxTop store={store}>
      <Router routes={currentRoutes} history={appHistory} />
    </FluxTop>
  ), appElement);
}

renderAll();

if (module.hot) {
  const ReactDOM = require('react-dom');

  function renderAndCatch() {
    try {
      renderAll();
    } catch (e) {
      console.error('Hot Render', e.stack || e);
    }
  }

  module.hot.accept('src/routes', () => {
    currentRoutes = require('src/routes').default;
    ReactDOM.unmountComponentAtNode(appElement);
    renderAndCatch();
  });
}

