import { RefObject } from 'react';

type Item = {
  label: string;
  href: string;
};

export type MenuListProps = {
  items: Item[];
  ref: RefObject<any>;
};
