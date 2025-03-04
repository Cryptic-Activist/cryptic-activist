import { Request, Response, NextFunction } from 'express';
import { validate } from 'cryptic-utils';

export function validateInputCreatePaymentMethodCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { name } = req.body;

  const errors: string[] = validate({ name }, { name: 'string' });

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}
