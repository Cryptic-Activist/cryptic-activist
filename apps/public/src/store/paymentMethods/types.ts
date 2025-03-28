import { PaymentMethod } from '../paymentMethod/types';

export type PaymentMethodsStore = {
  paymentMethods: {
    data?: PaymentMethod[];
    setPaymentMethodsValue: (
      value: Value,
      action?: `paymentMethods/${string}`
    ) => void;
    getPaymentMethods: () => Promise<void>;
    getPaymentMethodsByCategory: (categoryId: string) => Promise<void>;
  };
};

export type PaymentMethodsSetter = {
  data: {
    id: string;
    name: string;
    symbol: string;
  }[];
};

export type Value = PaymentMethodsSetter;
