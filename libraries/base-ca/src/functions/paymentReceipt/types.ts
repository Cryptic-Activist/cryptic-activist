import { Prisma } from '@/services/prisma';

export type CreatePaymentReceipt = Prisma.PaymentReceiptCreateInput;

export type CreateManyPaymentReceipts =
  Prisma.PaymentReceiptCreateManyInput;

export type WherePaymentReceipt =
  Prisma.PaymentReceiptWhereUniqueInput;

export type UpdatePaymentReceiptParams = {
  toUpdate: Prisma.PaymentReceiptUpdateInput;
  where: Prisma.PaymentReceiptWhereUniqueInput;
};

export type DeletePaymentReceiptParams = {
  where: Prisma.PaymentReceiptWhereUniqueInput;
};

export type GetPaymentReceiptParams = {
  where?: Prisma.PaymentReceiptWhereInput;
  select?: Prisma.PaymentReceiptSelect;
};

export type GetPaymentReceiptsParams = {
  where?: Prisma.PaymentReceiptWhereInput;
  limit?: number;
  select?: Prisma.PaymentReceiptSelect;
};

export type GetPaymentReceiptsPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.PaymentReceiptWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.PaymentReceiptWhereInput;
  select?: Prisma.PaymentReceiptSelect;
  orderBy?: Prisma.PaymentReceiptOrderByWithAggregationInput;
};
