import { BatchPayload, Fiat, prisma } from '../../services/prisma';
import {
  CreateFiat,
  CreateManyFiats,
  DeleteFiatParams,
  GetFiatParams,
  GetFiatsPaginationParams,
  GetFiatsParams,
  UpdateFiatParams,
} from './types';

export const createFiat = async (params: CreateFiat) => {
  try {
    const newFiat = await prisma.fiat.upsert(params);

    return newFiat;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyFiats = async (params: CreateManyFiats[]) => {
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
}: UpdateFiatParams) => {
  const updated = await prisma.fiat.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteFiat = async ({ where }: DeleteFiatParams) => {
  const deleted = await prisma.fiat.delete({
    where,
  });
  return deleted;
};

export const getFiat = async ({ where, select }: GetFiatParams) => {
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
}: GetFiatsParams) => {
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
}: GetFiatsPaginationParams) => {
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

export const countFiats = async () => {
  const count = await prisma.fiat.count();
  return count;
};
