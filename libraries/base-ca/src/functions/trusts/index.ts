import { BatchPayload, Trust, prisma } from '../../services/prisma';
import {
  CreateManyTrusts,
  CreateTrust,
  DeleteTrustParams,
  GetTrustParams,
  GetTrustsPaginationParams,
  GetTrustsParams,
  UpdateTrustParams,
  WhereTrust,
} from './types';

export const createTrust = async (
  params: CreateTrust
): Promise<Trust> => {
  try {
    const trust = await prisma.trust.findFirst({
      where: params as WhereTrust,
    });

    if (trust) {
      return trust;
    }

    const newTrust = await prisma.trust.create({
      data: params,
    });

    return newTrust;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyTrusts = async (
  params: CreateManyTrusts[]
): Promise<BatchPayload> => {
  try {
    const newTrusts = await prisma.trust.createMany({
      data: params,
    });

    return newTrusts;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateTrust = async ({
  toUpdate,
  where,
}: UpdateTrustParams): Promise<Trust> => {
  const updated = await prisma.trust.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteTrust = async ({
  where,
}: DeleteTrustParams): Promise<Trust> => {
  const deleted = await prisma.trust.delete({
    where,
  });
  return deleted;
};

export const getTrust = async ({
  where,
  select,
}: GetTrustParams): Promise<Trust | null> => {
  const trust = await prisma.trust.findFirst({
    ...(select && { select }),
    where,
  });

  if (!trust) {
    return null;
  }

  return trust;
};

export const getTrusts = async ({
  limit,
  where,
  select,
}: GetTrustsParams): Promise<Trust[]> => {
  const trusts = await prisma.trust.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return trusts;
};

export const getTrustsPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetTrustsPaginationParams): Promise<Trust[]> => {
  const trusts = await prisma.trust.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return trusts;
};
