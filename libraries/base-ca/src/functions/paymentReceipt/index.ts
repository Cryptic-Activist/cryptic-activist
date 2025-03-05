import { PaymentReceipt, prisma } from '../../services/prisma';
import {
  CreatePaymentReceiptParams,
  WherePaymentReceiptParams,
} from './types';

export const createPaymentReceipt = async (
  params: CreatePaymentReceiptParams
): Promise<PaymentReceipt | null> => {
  const paymentReceipt = await prisma.paymentReceipt.findFirst({
    where: params,
  });

  if (paymentReceipt) return null;

  const created = await prisma.paymentReceipt.create({
    data: params,
  });
  return created;
};

export const updatePaymentReceipt = async (
  toUpdate: WherePaymentReceiptParams,
  where: WherePaymentReceiptParams
): Promise<PaymentReceipt> => {
  const updated = await prisma.paymentReceipt.update({
    data: toUpdate,
    where,
  });
  return updated;
};

export const deletePaymentReceipt = async (
  where: WherePaymentReceiptParams
): Promise<PaymentReceipt> => {
  const deleted = await prisma.paymentReceipt.delete({ where });
  return deleted;
};

export const getPaymentReceipt = async (
  where: WherePaymentReceiptParams
): Promise<PaymentReceipt | null> => {
  const paymentReceipt = await prisma.paymentReceipt.findFirst({
    where,
  });

  if (!paymentReceipt) return null;

  return paymentReceipt;
};

export const getPaymentReceipts = async (
  where?: WherePaymentReceiptParams,
  limit?: number
): Promise<PaymentReceipt[]> => {
  const paymentReceipt = await prisma.paymentReceipt.findMany({
    take: limit,
    where,
  });

  return paymentReceipt;
};

export const getPaymentReceiptsPagination = async (
  limit: number,
  offset: number,
  where?: WherePaymentReceiptParams
): Promise<PaymentReceipt[]> => {
  const paymentReceipt = await prisma.paymentReceipt.findMany({
    take: limit,
    skip: offset,
    where,
  });

  return paymentReceipt;
};
