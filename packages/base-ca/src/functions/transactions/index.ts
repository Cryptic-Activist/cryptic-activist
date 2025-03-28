import {
  BatchPayload,
  Transaction,
  prisma,
} from '../../services/prisma';
import {
  CreateManyTransactions,
  CreateTransaction,
  DeleteTransactionParams,
  GetTransactionParams,
  GetTransactionsPaginationParams,
  GetTransactionsParams,
  UpdateTransactionParams,
} from './types';

export const createTransaction = async (
  params: CreateTransaction
): Promise<Transaction> => {
  try {
    const newTransaction = await prisma.transaction.upsert(params);

    return newTransaction;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyTransactions = async (
  params: CreateManyTransactions[]
): Promise<BatchPayload> => {
  try {
    const newTransactions = await prisma.transaction.createMany({
      data: params,
    });

    return newTransactions;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateTransaction = async ({
  toUpdate,
  where,
}: UpdateTransactionParams): Promise<Transaction> => {
  const updated = await prisma.transaction.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteTransaction = async ({
  where,
}: DeleteTransactionParams): Promise<Transaction> => {
  const deleted = await prisma.transaction.delete({
    where,
  });
  return deleted;
};

export const getTransaction = async ({
  where,
  select,
}: GetTransactionParams): Promise<Transaction | null> => {
  const transaction = await prisma.transaction.findFirst({
    ...(select && { select }),
    where,
  });

  if (!transaction) {
    return null;
  }

  return transaction;
};

export const getTransactions = async ({
  limit,
  where,
  select,
}: GetTransactionsParams): Promise<Transaction[]> => {
  const transactions = await prisma.transaction.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return transactions;
};

export const getTransactionsPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetTransactionsPaginationParams): Promise<Transaction[]> => {
  const transactions = await prisma.transaction.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return transactions;
};

export const countTransactions = async () => {
  const count = await prisma.transaction.count();
  return count;
};
