import {
  BatchPayload,
  PremiumPurchase,
  prisma,
} from '../../services/prisma';
import {
  CreateManyPremiumPurchases,
  CreatePremiumPurchase,
  DeletePremiumPurchaseParams,
  GetPremiumPurchaseParams,
  GetPremiumPurchasesPaginationParams,
  GetPremiumPurchasesParams,
  UpdatePremiumPurchaseParams,
  WherePremiumPurchase,
} from './types';

export const createPremiumPurchase = async (
  params: CreatePremiumPurchase
): Promise<PremiumPurchase> => {
  try {
    const premiumPurchase = await prisma.premiumPurchase.findFirst({
      where: params as WherePremiumPurchase,
    });

    if (premiumPurchase) {
      return premiumPurchase;
    }

    const newPremiumPurchase = await prisma.premiumPurchase.create({
      data: params,
    });

    return newPremiumPurchase;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyPremiumPurchases = async (
  params: CreateManyPremiumPurchases[]
): Promise<BatchPayload> => {
  try {
    const newPremiumPurchases =
      await prisma.premiumPurchase.createMany({
        data: params,
      });

    return newPremiumPurchases;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updatePremiumPurchase = async ({
  toUpdate,
  where,
}: UpdatePremiumPurchaseParams): Promise<PremiumPurchase> => {
  const updated = await prisma.premiumPurchase.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deletePremiumPurchase = async ({
  where,
}: DeletePremiumPurchaseParams): Promise<PremiumPurchase> => {
  const deleted = await prisma.premiumPurchase.delete({
    where,
  });
  return deleted;
};

export const getPremiumPurchase = async ({
  where,
  select,
}: GetPremiumPurchaseParams): Promise<PremiumPurchase | null> => {
  const premiumPurchase = await prisma.premiumPurchase.findFirst({
    ...(select && { select }),
    where,
  });

  if (!premiumPurchase) {
    return null;
  }

  return premiumPurchase;
};

export const getPremiumPurchases = async ({
  limit,
  where,
  select,
}: GetPremiumPurchasesParams): Promise<PremiumPurchase[]> => {
  const premiumPurchases = await prisma.premiumPurchase.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return premiumPurchases;
};

export const getPremiumPurchasesPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetPremiumPurchasesPaginationParams): Promise<
  PremiumPurchase[]
> => {
  const premiumPurchases = await prisma.premiumPurchase.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return premiumPurchases;
};

export const countPremiumPurchases = async () => {
  const count = await prisma.premiumPurchase.count();
  return count;
};
