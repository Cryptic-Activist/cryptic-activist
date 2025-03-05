import { DateType } from '@/functions/types';

import { GetPaymentMethodCategoryReturnType } from '../paymentMethodCategory/types';

export type CreatePaymentMethodParams = {
  name: string;
  paymentMethodCategoryId: string;
};

export type WherePaymentMethodParams = {
  id?: string;
  name?: string;
  paymentMethodCategoryId?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type PaymentMethodDynamicType = WherePaymentMethodParams;

export type PaymentMethodAssociationsType = {
  _count?: boolean;
  offers?: boolean;
  paymentMethodCategory?: boolean;
};

export type GetPaymentMethodReturnType = {
  id: string;
  name: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
  paymentMethodCategory?: GetPaymentMethodCategoryReturnType;
};
