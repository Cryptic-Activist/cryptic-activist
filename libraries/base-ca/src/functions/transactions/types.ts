import { Prisma } from '@/services/prisma';

export type CreateTransaction = Prisma.TransactionCreateInput;

export type CreateManyTransactions =
  Prisma.TransactionCreateManyInput;

export type WhereTransaction = Prisma.TransactionWhereUniqueInput;

export type UpdateTransactionParams = {
  toUpdate: Prisma.TransactionUpdateInput;
  where: Prisma.TransactionWhereUniqueInput;
};

export type DeleteTransactionParams = {
  where: Prisma.TransactionWhereUniqueInput;
};

export type GetTransactionParams = {
  where?: Prisma.TransactionWhereInput;
  select?: Prisma.TransactionSelect;
};

export type GetTransactionsParams = {
  where?: Prisma.TransactionWhereInput;
  limit?: number;
  select?: Prisma.TransactionSelect;
};

export type GetTransactionsPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.TransactionWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.TransactionWhereInput;
  select?: Prisma.TransactionSelect;
  orderBy?: Prisma.TransactionOrderByWithAggregationInput;
};
