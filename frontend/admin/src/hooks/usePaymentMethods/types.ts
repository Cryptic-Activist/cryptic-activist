export type UsePaymentMethodsParams = boolean;
export type CreatePaymentMethodParams = {
  name: string;
  paymentMethodCategory: {
    id: string;
  };
};
