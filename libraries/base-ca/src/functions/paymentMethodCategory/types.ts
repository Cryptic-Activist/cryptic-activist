import { DateType } from '@/functions/types';

export type CreatePaymentMethodCategoryParams = {
  name: string;
};

export type WherePaymentMethodCategoryParams = {
  id?: string;
  name?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type PaymentMethodCategoryDynamicType =
  WherePaymentMethodCategoryParams;

export type PaymentMethodCategoryAssociationsArrayType =
  | []
  | ['payment_method_category'];

export type GetPaymentMethodCategoryReturnType = {
  id: string;
  name: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
};
