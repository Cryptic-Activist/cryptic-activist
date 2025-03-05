import { NextFunction, Request, Response } from 'express';

import { CountTrusts } from './zod';

export const validateCountTrusts = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;

  const validated = CountTrusts.safeParse(query);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};
