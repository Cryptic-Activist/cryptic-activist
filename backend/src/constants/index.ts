import { Decimal } from '@/services/db';
import { NODE_ENV } from './env';

export const IS_DEVELOPMENT = NODE_ENV === 'development';

export const TIER_VOLUME = {
  BRONZE: new Decimal(10000),
  SILVER: new Decimal(50000),
  GOLD: new Decimal(100000),
  PLATINUM: new Decimal(200000),
  DIAMOND: new Decimal(500000),
};
