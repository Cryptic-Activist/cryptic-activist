import { Login, PasswordReset, PrivateKeys, Register } from './zod';
import { NextFunction, Request, Response } from 'express';

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = Login.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
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
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validatePasswordResetTokenRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.query;

  const validated = PasswordReset.safeParse(token);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validatePrivateKeysRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = PrivateKeys.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};
