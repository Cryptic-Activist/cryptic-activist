import {
  CreateOfferParams,
  DeleteOfferParams,
  GetOfferParams,
  GetOffersPaginationParams,
  GetOffersParams,
  UpdateOfferParams,
} from './types';
import { Offer, prisma } from '@/services/prisma';
import {
  createParamsRemapping,
  updateParamsRemapping,
} from '../../utils/remap/offers';

export const createOffer = async (
  params: CreateOfferParams
): Promise<Offer> => {
  try {
    const newParams = createParamsRemapping(params);

    const offer = await prisma.offer.findFirst({
      where: newParams,
    });

    if (offer) {
      return offer;
    }

    const newOffer = await prisma.offer.create({ data: params });

    return newOffer;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateOffer = async ({
  toUpdate,
  where,
}: UpdateOfferParams): Promise<Offer> => {
  const newParams = updateParamsRemapping(toUpdate);
  const updated = await prisma.offer.update({
    where,
    data: newParams,
  });
  return updated;
};

export const deleteOffer = async ({
  where,
}: DeleteOfferParams): Promise<Offer> => {
  const deleted = await prisma.offer.delete({ where });
  return deleted;
};

export const getOffer = async ({
  associations,
  where,
}: GetOfferParams): Promise<Offer | null> => {
  const offer = await prisma.offer.findFirst({
    where,
    include: associations,
  });

  if (!offer) return null;

  return offer;
};

export const getOffers = async ({
  associations,
  limit,
  where,
  select,
}: GetOffersParams): Promise<Offer[]> => {
  const offers = await prisma.offer.findMany({
    ...(limit && { take: limit }),
    ...(associations && { include: associations }),
    ...(select && { select }),
    where,
  });

  return offers;
};

export const getOffersPagination = async ({
  associations,
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetOffersPaginationParams): Promise<Offer[]> => {
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
