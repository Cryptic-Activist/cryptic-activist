import { NextFunction, Request, Response } from 'express';

import { AuthenticationUser } from './zod';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = AuthenticationUser.safeParse(req.headers);

    if (!validated.error) {
      res.status(401).send({
        errors: validated.error,
      });
    }

    next();
  } catch (errors) {
    res.status(500).send({
      errors,
    });
  }
};
