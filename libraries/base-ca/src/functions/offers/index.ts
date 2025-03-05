import { Offer, prisma } from '../../services/prisma';
import {
  createParamsRemapping,
  getParamsRemapping,
  updateParamsRemapping,
} from '../../utils/remap/offers';
import {
  CreateOfferParams,
  DeleteOfferWhereType,
  GetOfferWhereType,
  OfferAssociationsArrayType,
  UpdateOfferToUpdateType,
  UpdateOfferWhereType,
} from './types';

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

export const updateOffer = async (
  toUpdate: UpdateOfferToUpdateType,
  where: UpdateOfferWhereType
): Promise<Offer> => {
  const newParams = updateParamsRemapping(toUpdate);
  const updated = await prisma.offer.update({
    where,
    data: newParams,
  });
  return updated;
};

export const deleteOffer = async (
  where: DeleteOfferWhereType
): Promise<Offer> => {
  const deleted = await prisma.offer.delete({ where });
  return deleted;
};

export const getOffer = async (
  where: GetOfferWhereType,
  associations: OfferAssociationsArrayType
): Promise<Offer | null> => {
  const newWhere = getParamsRemapping(where);
  const offer = await prisma.offer.findFirst({
    where: newWhere,
    include: associations,
  });

  if (!offer) return null;

  return offer;
};

export const getOffers = async (
  associations: OfferAssociationsArrayType,
  where?: GetOfferWhereType,
  limit?: number
): Promise<Offer[]> => {
  const newWhere = getParamsRemapping(where);
  const offers = await prisma.offer.findMany({
    take: limit,
    where: newWhere,
    include: associations,
  });

  return offers;
};

export const getOffersPagination = async (
  associations: OfferAssociationsArrayType,
  limit: number,
  offset: number,
  where?: GetOfferWhereType
): Promise<Offer[]> => {
  const newWhere = getParamsRemapping(where);
  const offers = await prisma.offer.findMany({
    take: limit,
    skip: offset,
    where: newWhere,
    include: associations,
  });

  return offers;
};
