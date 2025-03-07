import { NextFunction, Request, Response } from 'express';

import { CreatePaymentMethodCategory } from './zod';

export const validateCreatePaymentMethodCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = CreatePaymentMethodCategory.safeParse(body);

  if (validated.error) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
