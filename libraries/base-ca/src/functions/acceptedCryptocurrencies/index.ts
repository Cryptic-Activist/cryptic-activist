import {
  AcceptedCryptocurrency,
  BatchPayload,
  prisma,
} from '../../services/prisma';
import {
  CreateAcceptedCryptocurrency,
  DeleteAcceptedCryptocurrencyParams,
  GetAcceptedCryptocurrenciesPaginationParams,
  GetAcceptedCryptocurrenciesParams,
  GetAcceptedCryptocurrencyParams,
  UpdateAcceptedCryptocurrencyParams,
  WhereAcceptedCryptocurrency,
} from './types';

export const createAcceptedCryptocurrency = async (
  params: CreateAcceptedCryptocurrency
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
  params: CreateAcceptedCryptocurrency[]
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

export const updateAcceptedCryptocurrency = async ({
  toUpdate,
  where,
}: UpdateAcceptedCryptocurrencyParams): Promise<AcceptedCryptocurrency> => {
  const updated = await prisma.acceptedCryptocurrency.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteAcceptedCryptocurrency = async ({
  where,
}: DeleteAcceptedCryptocurrencyParams): Promise<AcceptedCryptocurrency> => {
  const deleted = await prisma.acceptedCryptocurrency.delete({
    where,
  });
  return deleted;
};

export const getAcceptedCryptocurrency = async ({
  where,
  select,
}: GetAcceptedCryptocurrencyParams): Promise<AcceptedCryptocurrency | null> => {
  const acceptedCryptocurrency =
    await prisma.acceptedCryptocurrency.findFirst({
      ...(select && { select }),
      where,
    });

  if (!acceptedCryptocurrency) {
    return null;
  }

  return acceptedCryptocurrency;
};

export const getAcceptedCryptocurrencies = async ({
  limit,
  where,
  select,
}: GetAcceptedCryptocurrenciesParams): Promise<
  AcceptedCryptocurrency[]
> => {
  const acceptedCryptocurrencies =
    await prisma.acceptedCryptocurrency.findMany({
      ...(limit && { take: limit }),
      ...(select && { select }),
      where,
    });

  return acceptedCryptocurrencies;
};

export const getAcceptedCryptocurrenciesPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetAcceptedCryptocurrenciesPaginationParams): Promise<
  AcceptedCryptocurrency[]
> => {
  const acceptedCryptocurrencies =
    await prisma.acceptedCryptocurrency.findMany({
      take: limit,
      ...(offset && { skip: offset }),
      ...(select && { select }),
      ...(cursor && { cursor }),
      ...(orderBy && { orderBy }),
      where,
    });

  return acceptedCryptocurrencies;
};
