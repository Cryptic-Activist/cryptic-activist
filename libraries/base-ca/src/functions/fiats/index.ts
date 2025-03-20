import { BatchPayload, Fiat, prisma } from '../../services/prisma';
import {
  CreateFiat,
  CreateManyFiats,
  DeleteFiatParams,
  GetFiatParams,
  GetFiatsPaginationParams,
  GetFiatsParams,
  UpdateFiatParams,
  WhereFiat,
} from './types';

export const createFiat = async (
  params: CreateFiat
): Promise<Fiat> => {
  try {
    const fiat = await prisma.fiat.findFirst({
      where: params as WhereFiat,
    });

    if (fiat) {
      return fiat;
    }

    const newFiat = await prisma.fiat.create({
      data: params,
    });

    return newFiat;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyFiats = async (
  params: CreateManyFiats[]
): Promise<BatchPayload> => {
  try {
    const newFiats = await prisma.fiat.createMany({
      data: params,
    });

    return newFiats;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateFiat = async ({
  toUpdate,
  where,
}: UpdateFiatParams): Promise<Fiat> => {
  const updated = await prisma.fiat.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteFiat = async ({
  where,
}: DeleteFiatParams): Promise<Fiat> => {
  const deleted = await prisma.fiat.delete({
    where,
  });
  return deleted;
};

export const getFiat = async ({
  where,
  select,
}: GetFiatParams): Promise<Fiat | null> => {
  const fiat = await prisma.fiat.findFirst({
    ...(select && { select }),
    where,
  });

  if (!fiat) {
    return null;
  }

  return fiat;
};

export const getFiats = async ({
  limit,
  where,
  select,
}: GetFiatsParams): Promise<Fiat[]> => {
  const fiats = await prisma.fiat.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return fiats;
};

export const getFiatsPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetFiatsPaginationParams): Promise<Fiat[]> => {
  const fiats = await prisma.fiat.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return fiats;
};
