import { NODE_ENV } from './env';

export const IS_DEVELOPMENT = NODE_ENV === 'development';

export const TIER_VOLUME = {
  BRONZE: 10000,
  SILVER: 50000,
  GOLD: 100000,
  PLATINUM: 200000,
  DIAMOND: 500000,
};
