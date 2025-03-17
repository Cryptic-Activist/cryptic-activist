import { GetOffers, GetOffersPagination } from './zod';
import { NextFunction, Request, Response } from 'express';

export const validateGetOffers = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;

  const validated = GetOffers.safeParse(query);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateGetOffersPagination = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;

  const validated = GetOffersPagination.safeParse(query);

  if (validated.error) {
    console.log({ errior: validated.error });
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
