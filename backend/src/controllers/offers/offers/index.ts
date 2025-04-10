import {
  GetCurrentVendorOffersRequest,
  GetOffersPaginationRequest,
  GetOffersRequest,
} from './types';
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

export const getCurrentVendorOffers = async (
  req: Request<GetCurrentVendorOffersRequest, {}, {}, {}>,
  res: Response,
) => {
  const { id } = req.params;

  try {
    const offers = await getOffers({
      where: {
        vendorId: id,
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
        offerType: true,
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
      return;
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
    excludedVendorId,
    cursor,
  } = req.query as unknown as GetOffersPaginationRequest;

  const take = parseInt(limit, 10) || 20;
  const cursorObj = cursor ? { id: cursor } : undefined;

  try {
    const offers = await getOffersPagination({
      limit: take + 1,
      cursor: cursorObj,
      orderBy: { id: 'desc' },
      where: {
        cryptocurrencyId,
        fiatId,
        offerType,
        paymentMethodId,
        vendorId: {
          notIn: excludedVendorId,
        },
      },
      select: {
        id: true,
        _count: {
          select: {
            trades: {
              where: {
                status: 'COMPLETED',
              },
            },
            feedbacks: true,
          },
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
            lastLoginAt: true,
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

    let nextCursor: string | null = null;

    if (offers.length > take) {
      const nextItem = offers.pop();
      nextCursor = nextItem?.id || null;
    }

    res.status(200).send({ offers, nextCursor });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: err,
    });
  }
};
