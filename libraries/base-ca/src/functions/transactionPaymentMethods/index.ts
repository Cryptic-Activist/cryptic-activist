import {
  BatchPayload,
  TransactionPaymentMethod,
  prisma,
} from '../../services/prisma';
import {
  CreateManyTransactionPaymentMethods,
  CreateTransactionPaymentMethod,
  DeleteTransactionPaymentMethodParams,
  GetTransactionPaymentMethodParams,
  GetTransactionPaymentMethodsPaginationParams,
  GetTransactionPaymentMethodsParams,
  UpdateTransactionPaymentMethodParams,
  WhereTransactionPaymentMethod,
} from './types';

export const createTransactionPaymentMethod = async (
  params: CreateTransactionPaymentMethod
): Promise<TransactionPaymentMethod> => {
  try {
    const transactionPaymentMethod =
      await prisma.transactionPaymentMethod.findFirst({
        where: params as WhereTransactionPaymentMethod,
      });

    if (transactionPaymentMethod) {
      return transactionPaymentMethod;
    }

    const newTransactionPaymentMethod =
      await prisma.transactionPaymentMethod.create({
        data: params,
      });

    return newTransactionPaymentMethod;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyTransactionPaymentMethods = async (
  params: CreateManyTransactionPaymentMethods[]
): Promise<BatchPayload> => {
  try {
    const newTransactionPaymentMethods =
      await prisma.transactionPaymentMethod.createMany({
        data: params,
      });

    return newTransactionPaymentMethods;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateTransactionPaymentMethod = async ({
  toUpdate,
  where,
}: UpdateTransactionPaymentMethodParams): Promise<TransactionPaymentMethod> => {
  const updated = await prisma.transactionPaymentMethod.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteTransactionPaymentMethod = async ({
  where,
}: DeleteTransactionPaymentMethodParams): Promise<TransactionPaymentMethod> => {
  const deleted = await prisma.transactionPaymentMethod.delete({
    where,
  });
  return deleted;
};

export const getTransactionPaymentMethod = async ({
  where,
  select,
}: GetTransactionPaymentMethodParams): Promise<TransactionPaymentMethod | null> => {
  const transactionPaymentMethod =
    await prisma.transactionPaymentMethod.findFirst({
      ...(select && { select }),
      where,
    });

  if (!transactionPaymentMethod) {
    return null;
  }

  return transactionPaymentMethod;
};

export const getTransactionPaymentMethods = async ({
  limit,
  where,
  select,
}: GetTransactionPaymentMethodsParams): Promise<
  TransactionPaymentMethod[]
> => {
  const transactionPaymentMethods =
    await prisma.transactionPaymentMethod.findMany({
      ...(limit && { take: limit }),
      ...(select && { select }),
      where,
    });

  return transactionPaymentMethods;
};

export const getTransactionPaymentMethodsPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetTransactionPaymentMethodsPaginationParams): Promise<
  TransactionPaymentMethod[]
> => {
  const transactionPaymentMethods =
    await prisma.transactionPaymentMethod.findMany({
      take: limit,
      ...(offset && { skip: offset }),
      ...(select && { select }),
      ...(cursor && { cursor }),
      ...(orderBy && { orderBy }),
      where,
    });

  return transactionPaymentMethods;
};
