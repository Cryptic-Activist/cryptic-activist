import { authorizeUser } from 'cryptic-utils';
import { Request, Response } from 'express';

import { JWT_SECRET } from '../../constants/env';

export const authorize = async (req: Request, res: Response) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const authorized = await authorizeUser(JWT_SECRET, authorization);

    if (!authorized.success) {
      return res.status(401).send({
        errors: authorized.errors,
      });
    }

    return res.status(200).send({});
  } catch (err) {
    return res.status(401).send({
      errors: [err],
    });
  }
};
