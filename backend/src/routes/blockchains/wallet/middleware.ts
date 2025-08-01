import { NextFunction, Request, Response } from 'express';

import { GetAdminArbitratorWallet } from './zod';

export const validateGetAdminArbitratorWallet = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validated = GetAdminArbitratorWallet.safeParse(req.params);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
