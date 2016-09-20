/* @flow */

import type {Store} from './store-types';

const store: Store = {
  items: {
    '1': {
      id: 1,
      name: 'Smooth Random',
      code: `
        return Math.random();
      `,
    },
    '2': {
      id: 2,
      name: 'Middle Ground',
      code: `
        return 0.5;
      `,
    },
    '3': {
      id: 3,
      name: 'Blink For Good Times',
      code: `
        if (x > 0.4 && x < 0.5) {
          return 0.8;
        }
        return 0.2;
      `,
    },
  },
  feed: [
    '1',
    '2',
    '3',
  ],
};


export default store;

