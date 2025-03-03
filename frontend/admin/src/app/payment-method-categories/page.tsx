"use client";

import { usePaymentMethodCategories } from "@/hooks";

import { PaymentMethodCategoriesList as List } from "@/components/List";

const PaymentMethodCategories = () => {
  const { paymentMethodCategories } = usePaymentMethodCategories(true);

  return <List items={paymentMethodCategories.data} />;
};

export default PaymentMethodCategories;
