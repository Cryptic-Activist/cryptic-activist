import { NextFunction, Request, Response } from 'express';

import { validate } from 'cryptic-utils';

export function validateInputCreatePaymentMethod(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | void {
  const { name, paymentMethodCategory } = req.body;
  const { id } = paymentMethodCategory;

  next();
}

export function validateInputGetPaymentMethodsByCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { categoryId } = req.params;

  const errors: string[] = validate({ categoryId }, { categoryId: 'string' });

  if (errors.length > 0) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}
