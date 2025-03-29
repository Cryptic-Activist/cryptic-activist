import type { PaymentMethodCategory } from "@/stores/paymentMethodCategories/types";

export type PaymentMethod = {
  id: string;
  name: string;
  isDeleted: boolean;
  whenDelete: string;
  createdAt: string;
  updatedAt: string;
  paymentMethodCategory: PaymentMethodCategory;
};

export type PaymentMethodState = {
  data: PaymentMethod[];
  loading: boolean;
  fetched: boolean;
  errors: string[];
};

export type CreatePaymentMethodParams = {
  name: string;
  paymentMethodCategory: {
    id: string;
  };
};
