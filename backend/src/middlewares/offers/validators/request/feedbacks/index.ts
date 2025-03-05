import { Request, Response, NextFunction } from 'express';

export function validateInputCountFeedbacks(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const { id, vendor_id, user_id, offer_id, message, type } = req.body;

  const errors: string[] = [];

  if (id) {
    if (id.length === 0) {
      errors.push('id must be valid.');
    }
  }

  if (vendor_id) {
    if (vendor_id.length === 0) {
      errors.push('vendor_id must be valid.');
    }
  }

  if (user_id) {
    if (user_id.length === 0) {
      errors.push('user_id must be valid.');
    }
  }

  if (offer_id) {
    if (offer_id.length === 0) {
      errors.push('offer_id must be valid.');
    }
  }

  if (message) {
    if (message.length === 0) {
      errors.push('message must be valid.');
    }
  }

  if (type) {
    if (type.length === 0) {
      errors.push('type must be valid.');
    } else if (type !== 'positive' && type !== 'negative') {
      errors.push("type must be 'positive' or 'negative'");
    }
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
