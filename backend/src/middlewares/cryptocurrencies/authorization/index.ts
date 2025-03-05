import { NextFunction, Request, Response } from 'express';

import { getAuth } from '@/services/api';

import { AuthenticateUser } from './zod';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const authorized = AuthenticateUser.safeParse(authorization);

    if (!authorized.success) {
      return res.status(401).send({
        errors: authorized.error,
      });
    }

    const auth = await getAuth(authorization);

    if (!auth) {
      return res.status(401).send({});
    }

    next();
  } catch (err) {
    return res.status(401).send({
      errors: [err.message],
    });
  }
};
