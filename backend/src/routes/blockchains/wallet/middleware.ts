import {
  CreateAdminWallet,
  GetAdminArbitratorWallet,
  SoftDeleteAdminWallet,
} from './zod';
import { NextFunction, Request, Response } from 'express';

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

export const validateCreateAdminWallet = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validated = CreateAdminWallet.safeParse(req.body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};

export const validateSoftDeleteAdminWallet = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validated = SoftDeleteAdminWallet.safeParse(req.params);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
