import { NextFunction, Request, Response } from 'express';

import { GetSupportedTokens } from './zod';

export const validateGetSupportedTokens = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params } = req;

  const validated = GetSupportedTokens.safeParse(params);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
