/* @flow */

export type Item = {
  id: number,
  name: string,
  detail: string,
};

export type Store = {
  items: {
    [id: string]: Item,
  },
};

