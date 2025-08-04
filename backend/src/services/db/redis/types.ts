import { ParseDurantionToSecondsParam } from '@/utils/date/type';

export type CacheDataParams = {
  cacheKey: string;
  expiry: ParseDurantionToSecondsParam;
  data: { [key: string]: any };
};
