import { NextFunction, Request, Response } from 'express';

import { CreateOffer } from './zod';

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
  }

  next();
};
