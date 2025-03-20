import {
  BatchPayload,
  Cryptocurrency,
  prisma,
} from '../../services/prisma';
import {
  CreateCryptocurrency,
  CreateManyCryptocurrencies,
  DeleteCryptocurrencyParams,
  GetCryptocurrenciesPaginationParams,
  GetCryptocurrenciesParams,
  GetCryptocurrencyParams,
  UpdateCryptocurrencyParams,
  WhereCryptocurrency,
} from './types';

export const createCryptocurrency = async (
  params: CreateCryptocurrency
): Promise<Cryptocurrency> => {
  try {
    const cryptocurrency = await prisma.cryptocurrency.findFirst({
      where: params as WhereCryptocurrency,
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
  params: CreateManyCryptocurrencies[]
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

export const updateCryptocurrency = async ({
  toUpdate,
  where,
}: UpdateCryptocurrencyParams): Promise<Cryptocurrency> => {
  const updated = await prisma.cryptocurrency.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteCryptocurrency = async ({
  where,
}: DeleteCryptocurrencyParams): Promise<Cryptocurrency> => {
  const deleted = await prisma.cryptocurrency.delete({
    where,
  });
  return deleted;
};

export const getCryptocurrency = async ({
  where,
  select,
}: GetCryptocurrencyParams): Promise<Cryptocurrency | null> => {
  const cryptocurrency = await prisma.cryptocurrency.findFirst({
    ...(select && { select }),
    where,
  });

  if (!cryptocurrency) {
    return null;
  }

  return cryptocurrency;
};

export const getCryptocurrencies = async ({
  limit,
  where,
  select,
}: GetCryptocurrenciesParams): Promise<Cryptocurrency[]> => {
  const cryptocurrencies = await prisma.cryptocurrency.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return cryptocurrencies;
};

export const getCryptocurrenciesPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetCryptocurrenciesPaginationParams): Promise<
  Cryptocurrency[]
> => {
  const cryptocurrencies = await prisma.cryptocurrency.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return cryptocurrencies;
};
