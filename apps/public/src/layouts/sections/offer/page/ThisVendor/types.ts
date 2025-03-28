import { UseQueryResult } from '@tanstack/react-query';
import { Vendor } from '@/store/offer/types';

export type ThisVendorProps = {
  vendor?: Vendor;
  queryOffer: UseQueryResult<any, Error>;
};
