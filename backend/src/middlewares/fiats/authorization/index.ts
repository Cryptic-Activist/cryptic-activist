import { NextFunction, Request, Response } from 'express';

import { AuthenticateUser } from './zod';
import { getAuth } from '../../../../../api-fiat-cryptic-activist/src/services/api';

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
        status_code: 401,
        // @ts-ignore
        errors: authorized.error,
      });
    }

    const auth = await getAuth(authorization);

    if (!auth) {
      return res.status(401).send({
        status_code: 401,
      });
    }

    next();
  } catch (err) {
    return res.status(401).send({
      status_code: 401,
      errors: [err.message],
    });
  }
};
