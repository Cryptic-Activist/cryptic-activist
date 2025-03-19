import {
  CreateTierParams,
  DeleteTierParams,
  GetTierParams,
  GetTiersPaginationParams,
  GetTiersParams,
  UpdateTierParams,
} from './types';
import { Tier, prisma } from '@/services/prisma';
import {
  createParamsRemapping,
  updateParamsRemapping,
} from '../../utils/remap/offers';

export const createTier = async (
  params: CreateTierParams
): Promise<Tier> => {
  try {
    const newParams = createParamsRemapping(params);

    const offer = await prisma.offer.findFirst({
      where: newParams,
    });

    if (offer) {
      return offer;
    }

    const newTier = await prisma.offer.create({ data: params });

    return newTier;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateTier = async ({
  toUpdate,
  where,
}: UpdateTierParams): Promise<Tier> => {
  const newParams = updateParamsRemapping(toUpdate);
  const updated = await prisma.offer.update({
    where,
    data: newParams,
  });
  return updated;
};

export const deleteTier = async ({
  where,
}: DeleteTierParams): Promise<Tier> => {
  const deleted = await prisma.offer.delete({ where });
  return deleted;
};

export const getTier = async ({
  associations,
  where,
  select,
}: GetTierParams) => {
  const offer = await prisma.offer.findFirst({
    ...(associations && { include: associations }),
    ...(select && { select }),
    where,
  });

  if (!offer) return null;

  return offer;
};

export const getTiers = async ({
  associations,
  limit,
  where,
  select,
}: GetTiersParams): Promise<Tier[]> => {
  const offers = await prisma.offer.findMany({
    ...(limit && { take: limit }),
    ...(associations && { include: associations }),
    ...(select && { select }),
    where,
  });

  return offers;
};

export const getTiersPagination = async ({
  associations,
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetTiersPaginationParams): Promise<Tier[]> => {
  console.log({ cursor });
  const offers = await prisma.offer.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(associations && { include: associations }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return offers;
};
