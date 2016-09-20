/* @flow */

import type {Store, Item} from 'src/store-types';

import React from 'react';
import withStore from 'src/flux/with-store.jsx';


type Props = {
  store: Store,
  params: {
    id: string,
  },
};

const DetailPage = ({store, params: {id}}: Props) => {
  const item = store.items[id];

  if (!item) {
    return (
      <div>Item not found</div>
    );
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <div>{item.detail}</div>
    </div>
  );
};

export default withStore()(DetailPage);

