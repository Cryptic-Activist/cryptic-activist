import { NextFunction, Request, Response } from 'express';

import { SubmitKYC } from './zod';

export const validateSubmitKYC = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = SubmitKYC.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};
