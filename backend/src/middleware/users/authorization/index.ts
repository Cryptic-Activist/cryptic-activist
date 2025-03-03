import { authorizeUser } from 'cryptic-utils';
import { NextFunction, Request, Response } from 'express';

import { JWT_SECRET } from '../../constants/env';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const authorized = await authorizeUser(JWT_SECRET, authorization);

    if (!authorized.success) {
      return res.status(401).send({
        errors: authorized.errors,
      });
    }

    next();
  } catch (errors) {
    return res.status(500).send({
      errors,
    });
  }
};
