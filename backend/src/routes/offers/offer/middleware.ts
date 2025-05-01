import { CreateOffer, EditOffer } from './zod';
import { NextFunction, Request, Response } from 'express';

export const validateCreateOffer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = CreateOffer.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};

export const validateEditOffer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = EditOffer.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
