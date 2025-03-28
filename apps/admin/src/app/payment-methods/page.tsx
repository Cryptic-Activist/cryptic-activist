"use client";

import { usePaymentMethods } from "@/hooks";

import { PaymentMethodsList as List } from "@/components/List";

const PaymentMethods = () => {
  const { paymentMethods } = usePaymentMethods(true);

  return <List items={paymentMethods.data} />;
};

export default PaymentMethods;
