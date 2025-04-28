import { UseQueryResult } from '@tanstack/react-query';

export type ThisVendorProps = {
  vendor?: any;
  queryOffer: UseQueryResult<any, Error>;
  trades?: any;
};
