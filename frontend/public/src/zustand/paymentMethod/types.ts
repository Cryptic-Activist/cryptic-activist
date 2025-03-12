export type PaymentMethod = {
  id: string;
  name: string;
};

export type PaymentMethodSetter = {
  id?: string;
  name?: string;
};

export type Value = PaymentMethodSetter;

export type PaymentMethodStore = {
  paymentMethod: {
    id?: string;
    name?: string;
    setPaymentMethodValue: (
      value: Value,
      action?: `paymentMethod/${string}`
    ) => void;
    setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  };
};
