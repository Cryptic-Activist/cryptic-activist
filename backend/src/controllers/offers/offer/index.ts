import { Request, Response } from 'express';

import { prisma } from '@/services/db/prisma';

export const createOfferController = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const newOffer = await prisma.offer.create({
      data: { ...body },
    });

    res.status(200).send(newOffer);
  } catch (err: any) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};

export const getOfferController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const offer = await prisma.offer.findFirst({
      where: {
        id: id as string,
      },
      select: {
        _count: {
          select: {
            trades: true,
          },
        },
        id: true,
        offerType: true,
        pricingType: true,
        listAt: true,
        limitMin: true,
        limitMax: true,
        timeLimit: true,
        tags: true,
        label: true,
        terms: true,
        instructions: true,
        createdAt: true,
        updatedAt: true,
        averageTradeSpeed: true,
        trades: {
          where: {
            feedback: {
              isNot: null,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 2,
          select: {
            feedback: {
              select: {
                id: true,
                type: true,
                trader: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    profileColor: true,
                  },
                },
              },
            },
          },
        },
        vendor: {
          select: {
            _count: {
              select: {
                blockers: true,
                trusters: true,
                tradeVendor: true,
                feedbackTrader: true,
              },
            },
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            profileColor: true,
            lastLoginAt: true,
            kyc: true,
            feedbackTrader: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 2,
              select: {
                trader: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    profileColor: true,
                  },
                },
              },
            },
            userLanguage: {
              select: {
                language: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            tier: {
              select: {
                name: true,
                level: true,
              },
            },
          },
        },
        cryptocurrency: {
          select: {
            id: true,
            name: true,
            symbol: true,
            image: true,
            coingeckoId: true,
          },
        },
        fiat: {
          select: {
            id: true,
            name: true,
            symbol: true,
            country: true,
          },
        },
        paymentMethod: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).send(offer);
  } catch (err: any) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getEditOffer = async (req: Request, res: Response) => {
  try {
    const { userId, offerId } = req.params;

    const offer = await prisma.offer.findFirst({
      where: {
        id: offerId as unknown as string,
        vendorId: userId,
      },
      select: {
        id: true,
        averageTradeSpeed: true,
        createdAt: true,
        cryptocurrency: true,
        fiat: true,
        label: true,
        instructions: true,
        limitMax: true,
        limitMin: true,
        listAt: true,
        offerType: true,
        paymentMethodId: true,
        pricingType: true,
        tags: true,
        terms: true,
        timeLimit: true,
        vendorWalletAddress: true,
      },
    });

    res.status(200).send(offer);
  } catch (err: any) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};

export const editOffer = async (req: Request, res: Response) => {
  try {
    const ids = req.params;
    const body = req.body;

    console.log({ ids, body });

    // const updateOffer = await prisma.offer.update({
    //   where: {
    //     id: id as unknown as string,
    //   },
    //   data: body,
    // });

    res.status(200).send();
  } catch (err: any) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};
