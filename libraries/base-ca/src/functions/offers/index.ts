import { BatchPayload, Offer, prisma } from '../../services/prisma';
import {
  CreateManyOffers,
  CreateOffer,
  DeleteOfferParams,
  GetOfferParams,
  GetOffersPaginationParams,
  GetOffersParams,
  UpdateOfferParams,
  WhereOffer,
} from './types';

export const createOffer = async (
  params: CreateOffer
): Promise<Offer> => {
  try {
    const offer = await prisma.offer.findFirst({
      where: params as WhereOffer,
    });

    if (offer) {
      return offer;
    }

    const newOffer = await prisma.offer.create({
      data: params,
    });

    return newOffer;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyOffers = async (
  params: CreateManyOffers[]
): Promise<BatchPayload> => {
  try {
    const newOffers = await prisma.offer.createMany({
      data: params,
    });

    return newOffers;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateOffer = async ({
  toUpdate,
  where,
}: UpdateOfferParams): Promise<Offer> => {
  const updated = await prisma.offer.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteOffer = async ({
  where,
}: DeleteOfferParams): Promise<Offer> => {
  const deleted = await prisma.offer.delete({
    where,
  });
  return deleted;
};

export const getOffer = async ({
  where,
  select,
}: GetOfferParams): Promise<Offer | null> => {
  const offer = await prisma.offer.findFirst({
    ...(select && { select }),
    where,
  });

  if (!offer) {
    return null;
  }

  return offer;
};

export const getOffers = async ({
  limit,
  where,
  select,
}: GetOffersParams): Promise<Offer[]> => {
  const offers = await prisma.offer.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return offers;
};

export const getOffersPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetOffersPaginationParams): Promise<Offer[]> => {
  const offers = await prisma.offer.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return offers;
};

export const countOffers = async () => {
  const count = await prisma.offer.count();
  return count;
};
