export type PaymentMethodCategory = {
  id: string;
  name: string;
};

export type PaymentMethodCategoriesState = {
  data?: PaymentMethodCategory[];
  loading: boolean;
  fetched: boolean;
  errors: string[];
};

export type PaymentMethodCategoriesSetter = PaymentMethodCategoriesState;
