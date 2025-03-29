import { Prisma } from '@/services/prisma';

export type CreatePaymentMethod = Prisma.PaymentMethodUpsertArgs;

export type CreateManyPaymentMethods =
  Prisma.PaymentMethodCreateManyInput;

export type WherePaymentMethod = Prisma.PaymentMethodWhereUniqueInput;

export type UpdatePaymentMethodParams = {
  toUpdate: Prisma.PaymentMethodUpdateInput;
  where: Prisma.PaymentMethodWhereUniqueInput;
};

export type DeletePaymentMethodParams = {
  where: Prisma.PaymentMethodWhereUniqueInput;
};

export type GetPaymentMethodParams = {
  where?: Prisma.PaymentMethodWhereInput;
  select?: Prisma.PaymentMethodSelect;
};

export type GetPaymentMethodsParams = {
  where?: Prisma.PaymentMethodWhereInput;
  limit?: number;
  select?: Prisma.PaymentMethodSelect;
  orderBy?: Prisma.PaymentMethodOrderByWithAggregationInput;
};

export type GetPaymentMethodsPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.PaymentMethodWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.PaymentMethodWhereInput;
  select?: Prisma.PaymentMethodSelect;
  orderBy?: Prisma.PaymentMethodOrderByWithAggregationInput;
};
