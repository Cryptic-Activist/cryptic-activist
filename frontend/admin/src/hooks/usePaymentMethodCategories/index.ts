"use client";
import { useEffect } from "react";
import { useStore } from "@nanostores/react";

import {
  paymentMethodCategories,
  createPaymentMethodCategory,
  listPaymentMethodCategory,
} from "@/stores";
import {
  CreatePaymentMethodCategoryParams,
  UsePaymentMethodCategoriesParams,
} from "./types";

const UsePaymentMethodCategories = (
  fetchData?: UsePaymentMethodCategoriesParams
) => {
  const $paymentMethodCategories = useStore(paymentMethodCategories);

  const handleCreatePaymentMethodCategory = async (
    data: CreatePaymentMethodCategoryParams
  ) => {
    await createPaymentMethodCategory(data);
  };

  const handleListPaymentMethodCategory = async () => {
    await listPaymentMethodCategory();
  };

  useEffect(() => {
    if (fetchData) {
      handleListPaymentMethodCategory();
    }
  }, [fetchData]);

  return {
    handleCreatePaymentMethodCategory,
    handleListPaymentMethodCategory,
    paymentMethodCategories: $paymentMethodCategories,
  };
};

export default UsePaymentMethodCategories;
