import { NextFunction, Request, Response } from 'express';

import { Login, PasswordReset, PrivateKeys, Register } from './zod';

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = Login.safeParse(body);

  if (!validated.success) {
    return res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = Register.safeParse(body);

  if (!validated.success) {
    return res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export function validatePasswordResetTokenRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { token } = req.query;

  const validated = PasswordReset.safeParse(token);

  if (!validated.success) {
    return res.status(400).send({
      errors: validated.error,
    });
  }

  next();
}

export function validatePrivateKeysRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { body } = req;

  const validated = PrivateKeys.safeParse(body);

  if (!validated.success) {
    return res.status(400).send({
      errors: validated.error,
    });
  }

  next();
}
