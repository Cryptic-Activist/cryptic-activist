import {
  GetCurrentVendorOffersRequest,
  GetMyOffersPaginationRequest,
  GetOffersPaginationRequest,
  GetOffersRequest,
} from './types';
import { Request, Response } from 'express';

import { prisma } from '@/services/db/prisma';

export const getOffersController = async (
  req: Request<{}, {}, {}, GetOffersRequest>,
  res: Response,
) => {
  const { cryptocurrencyId, fiatId, offerType, paymentMethodId } = req.query;

  try {
    const offers = await prisma.offer.findMany({
      where: {
        cryptocurrencyId,
        fiatId,
        offerType,
        paymentMethodId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        _count: {
          select: { trades: true },
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
    const offers = await prisma.offer.findMany({
      where: {
        vendorId: id,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        _count: {
          select: { trades: true },
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
    paymentMethodIds,
    limit,
    excludedVendorId,
    cursor,
    amount,
  } = req.query as unknown as GetOffersPaginationRequest;

  const take = parseInt(limit, 10) || 20;
  const cursorObj = cursor ? { id: cursor } : undefined;
  const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount;
  const paymentMethodIdsArray = paymentMethodIds
    ? paymentMethodIds.split(',')
    : undefined;
  const skip = cursor ? 1 : 0;

  try {
    const offers = await prisma.offer.findMany({
      take: take + 1,
      ...(cursorObj && { cursor: cursorObj, skip }),
      orderBy: { createdAt: 'desc' },
      where: {
        cryptocurrencyId,
        fiatId,
        offerType,
        ...(paymentMethodIdsArray && {
          paymentMethodId: { in: paymentMethodIdsArray },
        }),
        deletedAt: null,
        vendorId: {
          ...(excludedVendorId && { notIn: [excludedVendorId] }),
        },
        ...(amount && {
          AND: [
            { limitMin: { lte: amountNum } },
            { limitMax: { gte: amountNum } },
          ],
        }),
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
      nextCursor = offers[offers.length - 1].id || null;
    }

    res.status(200).send({ offers, nextCursor });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: err,
    });
  }
};

export const getMyOffersPaginationController = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.params;
  const { offerType } = req.query as unknown as GetMyOffersPaginationRequest;

  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const [offers, totalCount] = await Promise.all([
      prisma.offer.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        where: {
          offerType,
          vendorId: userId,
          deletedAt: null,
        },
        select: {
          id: true,
          label: true,
          terms: true,
          tags: true,
          timeLimit: true,
          pricingType: true,
          listAt: true,
          limitMin: true,
          limitMax: true,
          instructions: true,
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
      }),
      prisma.offer.count({
        where: {
          offerType,
          vendorId: userId,
          deletedAt: null,
        },
      }),
    ]);

    res.status(200).send({
      data: offers,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: err,
    });
  }
};
