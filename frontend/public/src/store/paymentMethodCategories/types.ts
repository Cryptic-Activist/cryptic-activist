export type PaymentMethodCategory = {
  id: string;
  name: string;
};

export type PaymentMethodCategoriesStore = {
  paymentMethodCategories: {
    data?: PaymentMethodCategory[];
    setPaymentMethodCategoriesValue: (
      value: Value,
      action?: `paymentMethodCategories/${string}`
    ) => void;
    getPaymentMethodCategories: () => Promise<void>;
  };
};

export type PaymentMethodCategoriesSetter = {
  data: {
    id: string;
    name: string;
  }[];
};

export type Value = PaymentMethodCategoriesSetter;
