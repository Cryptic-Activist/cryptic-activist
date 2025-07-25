import { NextFunction, Request, Response } from 'express';

import { SubscribeBody } from './zod';

export const validateSubscribe = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validatedBody = SubscribeBody.safeParse(body);

  if (!validatedBody.success) {
    res.status(400).send({
      errors: validatedBody.error,
    });
    return;
  }

  next();
};
