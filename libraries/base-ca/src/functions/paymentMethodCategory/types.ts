import { Prisma } from '@/services/prisma';

export type CreatePaymentMethodCategory =
  Prisma.PaymentMethodCategoryCreateInput;

export type CreateManyPaymentMethodCategories =
  Prisma.PaymentMethodCategoryCreateManyInput;

export type WherePaymentMethodCategory =
  Prisma.PaymentMethodCategoryWhereUniqueInput;

export type UpdatePaymentMethodCategoryParams = {
  toUpdate: Prisma.PaymentMethodCategoryUpdateInput;
  where: Prisma.PaymentMethodCategoryWhereUniqueInput;
};

export type DeletePaymentMethodCategoryParams = {
  where: Prisma.PaymentMethodCategoryWhereUniqueInput;
};

export type GetPaymentMethodCategoryParams = {
  where?: Prisma.PaymentMethodCategoryWhereInput;
  select?: Prisma.PaymentMethodCategorySelect;
};

export type GetPaymentMethodCategoriesParams = {
  where?: Prisma.PaymentMethodCategoryWhereInput;
  limit?: number;
  select?: Prisma.PaymentMethodCategorySelect;
};

export type GetPaymentMethodCategoriesPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.PaymentMethodCategoryWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.PaymentMethodCategoryWhereInput;
  select?: Prisma.PaymentMethodCategorySelect;
  orderBy?: Prisma.PaymentMethodCategoryOrderByWithAggregationInput;
};
