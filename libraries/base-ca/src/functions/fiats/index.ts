import { Fiat, prisma } from '../../services/prisma';
import { CreateFiatParams, WhereFiatParams } from './types';

export const createFiat = async (
  params: CreateFiatParams
): Promise<Fiat> => {
  try {
    const fiat = await prisma.fiat.findFirst({
      where: params,
    });

    if (fiat) {
      return fiat;
    }

    const newFiat = await prisma.fiat.create({ data: params });

    return newFiat;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateFiat = async (
  toUpdate: WhereFiatParams,
  where: WhereFiatParams
): Promise<Fiat> => {
  const updated = await prisma.fiat.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteFiat = async (where: WhereFiatParams) => {
  const deleted = await prisma.fiat.delete({ where });
  return deleted;
};

export const getFiat = async (
  where: WhereFiatParams
): Promise<Fiat | null> => {
  const fiat = await prisma.fiat.findFirst({
    where,
  });

  if (!fiat) {
    return null;
  }

  return fiat;
};

export const getFiats = async (
  where?: WhereFiatParams,
  limit?: number
): Promise<Fiat[]> => {
  const fiats = await prisma.fiat.findMany({
    where,
    take: limit,
  });

  return fiats;
};

export const getFiatsPagination = async (
  limit: number,
  offset: number,
  where?: WhereFiatParams
): Promise<Fiat[]> => {
  const fiats = await prisma.fiat.findMany({
    take: limit,
    skip: offset,
    where,
  });

  return fiats;
};
