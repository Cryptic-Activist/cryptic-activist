import { DateType } from '@/functions/types';

export type CreatePaymentReceiptParams = {
  name: string;
  key: string;
  url: string;
};

export type WherePaymentReceiptParams = {
  id?: string;
  name?: string;
  key?: string;
  url?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type PaymentReceiptDynamicType = WherePaymentReceiptParams;
