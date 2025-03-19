import { Request, Response } from 'express';
import { createOffer, getOffer } from 'base-ca';

import { convertAssociationStringToObject } from '@/utils/map';

export const createOfferController = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const newOffer = await createOffer(body);

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
    const { query, params } = req;
    const { associations } = query;
    const { id } = params;

    const associationsObject = convertAssociationStringToObject(
      associations as string,
    );

    const offer = await getOffer({
      where: {
        id: id as string,
      },
      select: {
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
        vendor: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
        },
        cryptocurrency: {
          select: {
            id: true,
            name: true,
            symbol: true,
            image: true,
          },
        },
        fiat: {
          select: {
            id: true,
            name: true,
            symbol: true,
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
