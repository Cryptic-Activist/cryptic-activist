import { NextFunction, Request, Response } from 'express';

import { CreateSystemMessage } from './zod';

export const validateCreateSystemMessage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = CreateSystemMessage.safeParse(body);

  if (!validated.success) {
    return res.status(400).send({
      status_code: 400,
      // @ts-ignore
      errors: validated.error,
    });
  }

  next();
};
