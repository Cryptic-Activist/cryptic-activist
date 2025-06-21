import { IS_DEVELOPMENT } from '..';

export const SUPPORTED_CHAIN_IDS = [
  {
    label: 'Ethereum',
    value: 1,
  },
  {
    label: 'Polygon',
    value: 137,
  },
  ...(IS_DEVELOPMENT
    ? [
        { label: 'Localhost', value: 1337 },
        { label: 'Amoy', value: 80002 },
      ]
    : []),
];

export const DEFAULT_CHAIN_ID = 137;
