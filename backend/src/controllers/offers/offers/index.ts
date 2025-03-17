import { GetOffersPaginationRequest, GetOffersRequest } from './types';
import { Request, Response } from 'express';
import { getOffers, getOffersPagination } from 'base-ca';

export const getOffersController = async (
  req: Request<{}, {}, {}, GetOffersRequest>,
  res: Response,
) => {
  const { cryptocurrencyId, fiatId, offerType, paymentMethodId } = req.query;

  try {
    const offers = await getOffers({
      where: {
        cryptocurrencyId,
        fiatId,
        offerType,
        paymentMethodId,
      },
      select: {
        _count: {
          select: { trades: true, feedbacks: true },
        },
        id: true,
        label: true,
        terms: true,
        tags: true,
        timeLimit: true,
        pricingType: true,
        listAt: true,
        limitMin: true,
        limitMax: true,
        vendor: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            profileColor: true,
            id: true,
          },
        },
        cryptocurrency: {
          select: {
            id: true,
            name: true,
            symbol: true,
          },
        },
        fiat: {
          select: {
            id: true,
            name: true,
            symbol: true,
          },
        },
      },
    });

    if (!offers) {
      res.status(204).send([]);
    }

    res.status(200).send(offers);
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: err,
    });
  }
};

export const getOffersPaginationController = async (
  req: Request,
  res: Response,
) => {
  const {
    cryptocurrencyId,
    fiatId,
    offerType,
    paymentMethodId,
    limit,
    offset,
  } = req.query as unknown as GetOffersPaginationRequest;

  try {
    const offers = await getOffersPagination({
      limit,
      offset: offset,
      where: {
        cryptocurrencyId,
        fiatId,
        offerType,
        paymentMethodId,
      },
      select: {
        _count: {
          select: { trades: true, feedbacks: true },
        },
        label: true,
        terms: true,
        tags: true,
        timeLimit: true,
        pricingType: true,
        listAt: true,
        limitMin: true,
        limitMax: true,
        vendor: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            profileColor: true,
            id: true,
          },
        },
        cryptocurrency: {
          select: {
            id: true,
            name: true,
            symbol: true,
          },
        },
        fiat: {
          select: {
            id: true,
            name: true,
            symbol: true,
          },
        },
      },
    });

    if (!offers) {
      res.status(204).send([]);
    }

    res.status(200).send(offers);
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: err,
    });
  }
};
