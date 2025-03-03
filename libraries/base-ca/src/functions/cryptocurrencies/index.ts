import {
  BatchPayload,
  Cryptocurrency,
  prisma,
} from '../../services/prisma';
import {
  CreateCryptocurrencyParams,
  WhereCryptocurrencyParams,
} from './types';

export const createCryptocurrency = async (
  params: CreateCryptocurrencyParams
): Promise<Cryptocurrency> => {
  try {
    const cryptocurrency = await prisma.cryptocurrency.findFirst({
      where: params,
    });

    if (cryptocurrency) {
      return cryptocurrency;
    }

    const newCryptocurrency = await prisma.cryptocurrency.create({
      data: params,
    });

    return newCryptocurrency;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyCryptocurrencies = async (
  params: CreateCryptocurrencyParams[]
): Promise<BatchPayload> => {
  try {
    const newCryptocurrencies =
      await prisma.cryptocurrency.createMany({
        data: params,
      });

    return newCryptocurrencies;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateCryptocurrency = async (
  toUpdate: WhereCryptocurrencyParams,
  where: WhereCryptocurrencyParams
): Promise<Cryptocurrency> => {
  const updated = await prisma.cryptocurrency.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteCryptocurrency = async (
  where: WhereCryptocurrencyParams
): Promise<Cryptocurrency> => {
  const deleted = await prisma.cryptocurrency.delete({ where });
  return deleted;
};

export const getCryptocurrency = async (
  where: WhereCryptocurrencyParams
): Promise<Cryptocurrency | null> => {
  const cryptocurrency = await prisma.cryptocurrency.findFirst({
    where,
  });

  if (!cryptocurrency) {
    return null;
  }

  return cryptocurrency;
};

export const getCryptocurrencies = async (
  where?: WhereCryptocurrencyParams,
  limit?: number
): Promise<Cryptocurrency[]> => {
  const cryptocurrencies = await prisma.cryptocurrency.findMany({
    where,
    take: limit,
  });

  return cryptocurrencies;
};

export const getCryptocurrenciesPagination = async (
  limit: number,
  offset: number,
  where?: WhereCryptocurrencyParams
): Promise<Cryptocurrency[]> => {
  const cryptocurrencies = await prisma.cryptocurrency.findMany({
    take: limit,
    skip: offset,
    where,
  });

  return cryptocurrencies;
};
