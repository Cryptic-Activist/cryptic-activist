import {
  CreatePaymentMethodCategoryParams,
  WherePaymentMethodCategoryParams,
} from './types';
import { PaymentMethodCategory, prisma } from '../../services/prisma';

export const createPaymentMethodCategory = async (
  params: CreatePaymentMethodCategoryParams
): Promise<PaymentMethodCategory | null> => {
  const paymentMethodCategory =
    await prisma.paymentMethodCategory.findFirst({ where: params });

  if (paymentMethodCategory) return null;

  const newPaymentMethodCategory =
    await prisma.paymentMethodCategory.create({
      data: params,
    });

  return newPaymentMethodCategory;
};

export const updatePaymentMethodCategory = async (
  toUpdate: WherePaymentMethodCategoryParams,
  where: WherePaymentMethodCategoryParams
): Promise<PaymentMethodCategory> => {
  const updated = await prisma.paymentMethodCategory.update({
    where,
    data: toUpdate,
  });
  return updated;
};

export const deletePaymentMethodCategory = async (
  where: WherePaymentMethodCategoryParams
): Promise<PaymentMethodCategory> => {
  const deleted = await prisma.paymentMethodCategory.delete({
    where,
  });
  return deleted;
};

export const getPaymentMethodCategory = async (
  where: WherePaymentMethodCategoryParams
): Promise<PaymentMethodCategory | null> => {
  const paymentMethodCategory =
    await prisma.paymentMethodCategory.findFirst({ where });

  if (!paymentMethodCategory) return null;

  return paymentMethodCategory;
};

export const getPaymentMethodCategories = async (
  where?: WherePaymentMethodCategoryParams,
  limit?: number
): Promise<PaymentMethodCategory[]> => {
  const paymentMethodCategories =
    await prisma.paymentMethodCategory.findMany({
      take: limit,
      where,
    });

  return paymentMethodCategories;
};

export const getPaymentMethodCategoriesPagination = async (
  limit: number,
  offset: number,
  where?: WherePaymentMethodCategoryParams
): Promise<PaymentMethodCategory[]> => {
  const paymentMethodCategories =
    await prisma.paymentMethodCategory.findMany({
      take: limit,
      skip: offset,
      where,
    });

  return paymentMethodCategories;
};
