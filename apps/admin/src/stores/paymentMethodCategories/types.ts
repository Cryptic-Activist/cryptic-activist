export type PaymentMethodCategory = {
  id: string;
  name: string;
  isDeleted: boolean;
  whenDelete: string;
  createdAt: string;
  updatedAt: string;
};

export type PaymentMethodCategoryState = {
  data: PaymentMethodCategory[];
  loading: boolean;
  fetched: boolean;
  errors: string[];
};

export type CreatePaymentMethodCategoryParams = {
  name: string;
};
