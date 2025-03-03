import { PaymentMethod, prisma } from '../../services/prisma';
import {
  CreatePaymentMethodParams,
  PaymentMethodAssociationsType,
  WherePaymentMethodParams,
} from './types';

export const createPaymentMethod = async (
  params: CreatePaymentMethodParams
): Promise<PaymentMethod> => {
  try {
    const paymentMethod = await prisma.paymentMethod.findFirst({
      where: params,
    });

    if (paymentMethod) {
      return paymentMethod;
    }

    const newFeedback = await prisma.paymentMethod.create({
      data: params,
    });

    return newFeedback;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updatePaymentMethod = async (
  toUpdate: WherePaymentMethodParams,
  where: WherePaymentMethodParams
): Promise<PaymentMethod> => {
  const updated = await prisma.paymentMethod.update({
    where,
    data: toUpdate,
  });
  return updated;
};

export const deletePaymentMethod = async (
  where: WherePaymentMethodParams
): Promise<PaymentMethod> => {
  const deleted = await prisma.paymentMethod.delete({ where });
  return deleted;
};

export const getPaymentMethod = async (
  where: WherePaymentMethodParams,
  associations: PaymentMethodAssociationsType
): Promise<PaymentMethod | null> => {
  const paymentMethod = await prisma.paymentMethod.findFirst({
    where,
    include: associations,
  });

  if (!paymentMethod) return null;

  return paymentMethod;
};

export const getPaymentMethods = async (
  associations: PaymentMethodAssociationsType,
  where?: WherePaymentMethodParams,
  limit?: number
): Promise<PaymentMethod[]> => {
  const paymentMethods = await prisma.paymentMethod.findMany({
    take: limit,
    where,
    include: associations,
  });

  return paymentMethods;
};

export const getPaymentMethodsPagination = async (
  associations: PaymentMethodAssociationsType,
  limit: number,
  offset: number,
  where?: WherePaymentMethodParams
): Promise<PaymentMethod[]> => {
  const paymentMethods = await prisma.paymentMethod.findMany({
    take: limit,
    skip: offset,
    where,
    include: associations,
  });

  return paymentMethods;
};
