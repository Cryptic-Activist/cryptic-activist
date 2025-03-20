import {
  BatchPayload,
  PaymentMethod,
  prisma,
} from '../../services/prisma';
import {
  CreateManyPaymentMethods,
  CreatePaymentMethod,
  DeletePaymentMethodParams,
  GetPaymentMethodParams,
  GetPaymentMethodsPaginationParams,
  GetPaymentMethodsParams,
  UpdatePaymentMethodParams,
  WherePaymentMethod,
} from './types';

export const createPaymentMethod = async (
  params: CreatePaymentMethod
): Promise<PaymentMethod> => {
  try {
    const paymentMethod = await prisma.paymentMethod.findFirst({
      where: params as WherePaymentMethod,
    });

    if (paymentMethod) {
      return paymentMethod;
    }

    const newPaymentMethod = await prisma.paymentMethod.create({
      data: params,
    });

    return newPaymentMethod;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyPaymentMethods = async (
  params: CreateManyPaymentMethods[]
): Promise<BatchPayload> => {
  try {
    const newPaymentMethods = await prisma.paymentMethod.createMany({
      data: params,
    });

    return newPaymentMethods;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updatePaymentMethod = async ({
  toUpdate,
  where,
}: UpdatePaymentMethodParams): Promise<PaymentMethod> => {
  const updated = await prisma.paymentMethod.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deletePaymentMethod = async ({
  where,
}: DeletePaymentMethodParams): Promise<PaymentMethod> => {
  const deleted = await prisma.paymentMethod.delete({
    where,
  });
  return deleted;
};

export const getPaymentMethod = async ({
  where,
  select,
}: GetPaymentMethodParams): Promise<PaymentMethod | null> => {
  const paymentMethod = await prisma.paymentMethod.findFirst({
    ...(select && { select }),
    where,
  });

  if (!paymentMethod) {
    return null;
  }

  return paymentMethod;
};

export const getPaymentMethods = async ({
  limit,
  where,
  select,
}: GetPaymentMethodsParams): Promise<PaymentMethod[]> => {
  const paymentMethods = await prisma.paymentMethod.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return paymentMethods;
};

export const getPaymentMethodsPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetPaymentMethodsPaginationParams): Promise<PaymentMethod[]> => {
  const paymentMethods = await prisma.paymentMethod.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return paymentMethods;
};
