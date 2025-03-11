export type PaymentMethod = {
  id: string;
  name: string;
};

export type PaymentMethodState = PaymentMethod | object;

export type PaymentMethodSetter = PaymentMethod;
