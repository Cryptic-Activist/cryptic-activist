import {
  BatchPayload,
  PaymentMethodCategory,
  prisma,
} from '../../services/prisma';
import {
  CreateManyPaymentMethodCategories,
  CreatePaymentMethodCategory,
  DeletePaymentMethodCategoryParams,
  GetPaymentMethodCategoriesPaginationParams,
  GetPaymentMethodCategoriesParams,
  GetPaymentMethodCategoryParams,
  UpdatePaymentMethodCategoryParams,
  WherePaymentMethodCategory,
} from './types';

export const createPaymentMethodCategory = async (
  params: CreatePaymentMethodCategory
): Promise<PaymentMethodCategory> => {
  try {
    const paymentMethodCategory =
      await prisma.paymentMethodCategory.findFirst({
        where: params as WherePaymentMethodCategory,
      });

    if (paymentMethodCategory) {
      return paymentMethodCategory;
    }

    const newPaymentMethodCategory =
      await prisma.paymentMethodCategory.create({
        data: params,
      });

    return newPaymentMethodCategory;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyPaymentMethodCategories = async (
  params: CreateManyPaymentMethodCategories[]
): Promise<BatchPayload> => {
  try {
    const newPaymentMethodCategories =
      await prisma.paymentMethodCategory.createMany({
        data: params,
      });

    return newPaymentMethodCategories;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updatePaymentMethodCategory = async ({
  toUpdate,
  where,
}: UpdatePaymentMethodCategoryParams): Promise<PaymentMethodCategory> => {
  const updated = await prisma.paymentMethodCategory.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deletePaymentMethodCategory = async ({
  where,
}: DeletePaymentMethodCategoryParams): Promise<PaymentMethodCategory> => {
  const deleted = await prisma.paymentMethodCategory.delete({
    where,
  });
  return deleted;
};

export const getPaymentMethodCategory = async ({
  where,
  select,
}: GetPaymentMethodCategoryParams): Promise<PaymentMethodCategory | null> => {
  const paymentMethodCategory =
    await prisma.paymentMethodCategory.findFirst({
      ...(select && { select }),
      where,
    });

  if (!paymentMethodCategory) {
    return null;
  }

  return paymentMethodCategory;
};

export const getPaymentMethodCategories = async ({
  limit,
  where,
  select,
}: GetPaymentMethodCategoriesParams): Promise<
  PaymentMethodCategory[]
> => {
  const paymentMethodCategories =
    await prisma.paymentMethodCategory.findMany({
      ...(limit && { take: limit }),
      ...(select && { select }),
      where,
    });

  return paymentMethodCategories;
};

export const getPaymentMethodCategoriesPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetPaymentMethodCategoriesPaginationParams): Promise<
  PaymentMethodCategory[]
> => {
  const paymentMethodCategories =
    await prisma.paymentMethodCategory.findMany({
      take: limit,
      ...(offset && { skip: offset }),
      ...(select && { select }),
      ...(cursor && { cursor }),
      ...(orderBy && { orderBy }),
      where,
    });

  return paymentMethodCategories;
};

export const countPaymentMethodCategories = async () => {
  const count = await prisma.paymentMethodCategory.count();
  return count;
};
