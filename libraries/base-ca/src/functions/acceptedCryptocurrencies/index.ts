import {
  AcceptedCryptocurrency,
  BatchPayload,
  prisma,
} from '../../services/prisma';
import {
  CreateAcceptedCryptocurrencyParams,
  WhereAcceptedCryptocurrencyParams,
} from './types';

export const createAcceptedCryptocurrency = async (
  params: CreateAcceptedCryptocurrencyParams
): Promise<AcceptedCryptocurrency> => {
  try {
    const acceptedCryptocurrency =
      await prisma.acceptedCryptocurrency.findFirst({
        where: params,
      });

    if (acceptedCryptocurrency) {
      return acceptedCryptocurrency;
    }

    const newAcceptedCryptocurrency =
      await prisma.acceptedCryptocurrency.create({
        data: params,
      });

    return newAcceptedCryptocurrency;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyAcceptedCryptocurrencies = async (
  params: CreateAcceptedCryptocurrencyParams[]
): Promise<BatchPayload> => {
  try {
    const newAcceptedCryptocurrencies =
      await prisma.acceptedCryptocurrency.createMany({
        data: params,
      });

    return newAcceptedCryptocurrencies;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateAcceptedCryptocurrency = async (
  toUpdate: WhereAcceptedCryptocurrencyParams,
  where: WhereAcceptedCryptocurrencyParams
): Promise<AcceptedCryptocurrency> => {
  const updated = await prisma.acceptedCryptocurrency.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteAcceptedCryptocurrency = async (
  where: WhereAcceptedCryptocurrencyParams
): Promise<AcceptedCryptocurrency> => {
  const deleted = await prisma.acceptedCryptocurrency.delete({
    where,
  });
  return deleted;
};

export const getAcceptedCryptocurrency = async (
  where: WhereAcceptedCryptocurrencyParams
): Promise<AcceptedCryptocurrency | null> => {
  const acceptedCryptocurrency =
    await prisma.acceptedCryptocurrency.findFirst({
      where,
    });

  if (!acceptedCryptocurrency) {
    return null;
  }

  return acceptedCryptocurrency;
};

export const getAcceptedCryptocurrencies = async (
  where?: WhereAcceptedCryptocurrencyParams,
  limit?: number
): Promise<AcceptedCryptocurrency[]> => {
  const cryptocurrencies =
    await prisma.acceptedCryptocurrency.findMany({
      where,
      take: limit,
    });

  return cryptocurrencies;
};

export const getAcceptedCryptocurrenciesPagination = async (
  limit: number,
  offset: number,
  where?: WhereAcceptedCryptocurrencyParams
): Promise<AcceptedCryptocurrency[]> => {
  const cryptocurrencies =
    await prisma.acceptedCryptocurrency.findMany({
      take: limit,
      skip: offset,
      where,
    });

  return cryptocurrencies;
};
