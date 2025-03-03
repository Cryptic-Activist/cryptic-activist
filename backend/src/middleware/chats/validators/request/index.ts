import { Request, Response, NextFunction } from 'express';

export function requestBody(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  next();
}

export function validatePasswordResetTokenRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { token } = req.query;

  const errors: string[] = [];

  if (!token) {
    errors.push('Token is required');
  }

  if (typeof token !== 'string') {
    errors.push('Token must be a string');
  }

  if (token.length > 0) {
    errors.push('Token is invalid');
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}

export function validatePrivateKeysRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { privateKeys } = req.body;

  const errors: string[] = [];

  if (!privateKeys) {
    errors.push('Private keys is required');
  }

  if (typeof privateKeys !== 'object') {
    errors.push('Private keys format is invalid');
  }

  if (privateKeys.length !== 24) {
    errors.push('Private keys must be a 24 elements array of strings');
  }

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}
