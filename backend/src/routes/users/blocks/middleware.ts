import { NextFunction, Request, Response } from 'express';

import { CountBlocks } from './zod';

export const validateCountBlocks = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;

  const validated = CountBlocks.safeParse(query);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};
