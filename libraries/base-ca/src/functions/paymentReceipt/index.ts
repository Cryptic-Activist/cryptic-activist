import {
  BatchPayload,
  PaymentReceipt,
  prisma,
} from '../../services/prisma';
import {
  CreateManyPaymentReceipts,
  CreatePaymentReceipt,
  DeletePaymentReceiptParams,
  GetPaymentReceiptParams,
  GetPaymentReceiptsPaginationParams,
  GetPaymentReceiptsParams,
  UpdatePaymentReceiptParams,
  WherePaymentReceipt,
} from './types';

export const createPaymentReceipt = async (
  params: CreatePaymentReceipt
): Promise<PaymentReceipt> => {
  try {
    const paymentReceipt = await prisma.paymentReceipt.findFirst({
      where: params as WherePaymentReceipt,
    });

    if (paymentReceipt) {
      return paymentReceipt;
    }

    const newPaymentReceipt = await prisma.paymentReceipt.create({
      data: params,
    });

    return newPaymentReceipt;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyPaymentReceipts = async (
  params: CreateManyPaymentReceipts[]
): Promise<BatchPayload> => {
  try {
    const newPaymentReceipts = await prisma.paymentReceipt.createMany(
      {
        data: params,
      }
    );

    return newPaymentReceipts;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updatePaymentReceipt = async ({
  toUpdate,
  where,
}: UpdatePaymentReceiptParams): Promise<PaymentReceipt> => {
  const updated = await prisma.paymentReceipt.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deletePaymentReceipt = async ({
  where,
}: DeletePaymentReceiptParams): Promise<PaymentReceipt> => {
  const deleted = await prisma.paymentReceipt.delete({
    where,
  });
  return deleted;
};

export const getPaymentReceipt = async ({
  where,
  select,
}: GetPaymentReceiptParams): Promise<PaymentReceipt | null> => {
  const paymentReceipt = await prisma.paymentReceipt.findFirst({
    ...(select && { select }),
    where,
  });

  if (!paymentReceipt) {
    return null;
  }

  return paymentReceipt;
};

export const getPaymentReceipts = async ({
  limit,
  where,
  select,
}: GetPaymentReceiptsParams): Promise<PaymentReceipt[]> => {
  const paymentReceipts = await prisma.paymentReceipt.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return paymentReceipts;
};

export const getPaymentReceiptsPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetPaymentReceiptsPaginationParams): Promise<PaymentReceipt[]> => {
  const paymentReceipts = await prisma.paymentReceipt.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return paymentReceipts;
};

export const countPaymentReceipts = async () => {
  const count = await prisma.paymentReceipt.count();
  return count;
};
