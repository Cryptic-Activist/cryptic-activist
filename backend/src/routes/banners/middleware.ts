import { NextFunction, Request, Response } from 'express';

import { CreateBanner } from './zod';

export const validateCreateBanner = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = CreateBanner.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
