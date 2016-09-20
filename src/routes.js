import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'src/components/app.jsx';
import Feed from 'src/components/feed.jsx';
import DetailPage from 'src/components/detail.jsx';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Feed} />
    <Route path=":id" component={DetailPage} />
  </Route>
);

