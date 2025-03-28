import { Prisma } from '@/services/prisma';

export type CreateTransactionPaymentMethod =
  Prisma.TransactionPaymentMethodUpsertArgs;

export type CreateManyTransactionPaymentMethods =
  Prisma.TransactionPaymentMethodCreateManyInput;

export type WhereTransactionPaymentMethod =
  Prisma.TransactionPaymentMethodWhereUniqueInput;

export type UpdateTransactionPaymentMethodParams = {
  toUpdate: Prisma.TransactionPaymentMethodUpdateInput;
  where: Prisma.TransactionPaymentMethodWhereUniqueInput;
};

export type DeleteTransactionPaymentMethodParams = {
  where: Prisma.TransactionPaymentMethodWhereUniqueInput;
};

export type GetTransactionPaymentMethodParams = {
  where?: Prisma.TransactionPaymentMethodWhereInput;
  select?: Prisma.TransactionPaymentMethodSelect;
};

export type GetTransactionPaymentMethodsParams = {
  where?: Prisma.TransactionPaymentMethodWhereInput;
  limit?: number;
  select?: Prisma.TransactionPaymentMethodSelect;
  orderBy?: Prisma.TransactionPaymentMethodOrderByWithAggregationInput;
};

export type GetTransactionPaymentMethodsPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.TransactionPaymentMethodWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.TransactionPaymentMethodWhereInput;
  select?: Prisma.TransactionPaymentMethodSelect;
  orderBy?: Prisma.TransactionPaymentMethodOrderByWithAggregationInput;
};
