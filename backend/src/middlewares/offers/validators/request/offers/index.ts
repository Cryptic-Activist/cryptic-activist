import { NextFunction, Request, Response } from 'express';
import { CreateOffer } from '../../offers';

import { IndexPagination } from './zod';

export const validateOffersIndex = (
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response => {
  const {
    id,
    vendor_id,
    cryptocurrency_id,
    payment_method_id,
    fiat_id,
    payment_method_type,
    trade_pricing_type,
    trade_pricing_list_at,
    trade_pricing_trade_limits_min,
    trade_pricing_trade_limits_max,
    trade_pricing_time_limit,
    trade_instructions_tags,
    trade_instructions_label,
    trade_instructions_terms,
    trade_instructions_instructions,
    is_deleted,
    when_deleted,
    created_at,
    updated_at,
    associations,
    limit,
  } = req.query;

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

  if (cryptocurrency_id) {
    if (cryptocurrency_id.length === 0) {
      errors.push('cryptocurrency_id must be valid.');
    }
  }

  if (payment_method_id) {
    if (payment_method_id.length === 0) {
      errors.push('payment_method_id must be valid.');
    }
  }

  if (fiat_id) {
    if (fiat_id.length === 0) {
      errors.push('fiat_id must be valid.');
    }
  }

  if (payment_method_type) {
    if (payment_method_type.length === 0) {
      errors.push('payment_method_type must be valid.');
    }
  }

  if (trade_pricing_type) {
    if (trade_pricing_type.length === 0) {
      errors.push('trade_pricing_type must be valid.');
    }
  }

  if (trade_pricing_list_at) {
    if (trade_pricing_list_at.length === 0) {
      errors.push('trade_pricing_list_at must be valid.');
    }
  }

  if (trade_pricing_trade_limits_min) {
    if (trade_pricing_trade_limits_min.length === 0) {
      errors.push('trade_pricing_trade_limits_min must be valid.');
    }
  }

  if (trade_pricing_trade_limits_max) {
    if (trade_pricing_trade_limits_max.length === 0) {
      errors.push('trade_pricing_trade_limits_max must be valid.');
    }
  }

  if (trade_pricing_time_limit) {
    if (trade_pricing_time_limit.length === 0) {
      errors.push('trade_pricing_time_limit must be valid.');
    }
  }

  if (trade_instructions_tags) {
    if (trade_instructions_tags.length === 0) {
      errors.push('trade_instructions_tags must be valid.');
    }
  }

  if (trade_instructions_label) {
    if (trade_instructions_label.length === 0) {
      errors.push('trade_instructions_label must be valid.');
    }
  }

  if (trade_instructions_terms) {
    if (trade_instructions_terms.length === 0) {
      errors.push('trade_instructions_terms must be valid.');
    }
  }

  if (trade_instructions_instructions) {
    if (trade_instructions_instructions.length === 0) {
      errors.push('trade_instructions_instructions must be valid.');
    }
  }

  if (is_deleted) {
    if (is_deleted.length === 0) {
      errors.push('is_deleted must be valid.');
    }
  }

  if (when_deleted) {
    if (when_deleted.length === 0) {
      errors.push('when_deleted must be valid.');
    }
  }

  if (created_at) {
    if (created_at.length === 0) {
      errors.push('created_at must be valid.');
    }
  }

  if (updated_at) {
    if (updated_at.length === 0) {
      errors.push('updated_at must be valid.');
    }
  }

  if (associations) {
    if (Array.isArray(associations)) {
      associations.forEach((association) => {
        if (
          association !== 'vendor' &&
          association !== 'cryptocurrency' &&
          association !== 'fiat' &&
          association !== 'payment_method'
        ) {
          errors.push(
            "associations must contain the following associatipn 'vendor', 'cryptocurrency', 'fiat', 'payment_method'",
          );
        }
      });
    }
  }

  if (limit) {
    try {
      Number(limit);
    } catch (err) {
      errors.push('limit must be a number');
    }
    if (limit.length === 0) {
      errors.push('limit must be greater than 0.');
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
};

export function validateInputIndexPagination(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { query } = req;

  const validated = IndexPagination.safeParse(query);

  if (!validated.success) {
    return res.status(400).send({
      status_code: 400,
      errors: validated.error,
    });
  }

  next();
}

export const validateInputCreateOffer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const validated = CreateOffer.safeParse(body);

  if (!validated.success) {
    return res.status(400).send({
      status_code: 400,
      results: {},
      errors: validated.error,
    });
  }

  next();
};

export function validateGetOffer(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response {
  const {
    id,
    vendor_id,
    cryptocurrency_id,
    payment_method_id,
    fiat_id,
    payment_method_type,
    trade_pricing_type,
    trade_pricing_list_at,
    trade_pricing_trade_limits_min,
    trade_pricing_trade_limits_max,
    trade_pricing_time_limit,
    trade_instructions_tags,
    trade_instructions_label,
    trade_instructions_terms,
    trade_instructions_instructions,
    is_deleted,
    when_deleted,
    created_at,
    updated_at,
    associations,
    limit,
  } = req.query;

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

  if (cryptocurrency_id) {
    if (cryptocurrency_id.length === 0) {
      errors.push('cryptocurrency_id must be valid.');
    }
  }

  if (payment_method_id) {
    if (payment_method_id.length === 0) {
      errors.push('payment_method_id must be valid.');
    }
  }

  if (fiat_id) {
    if (fiat_id.length === 0) {
      errors.push('fiat_id must be valid.');
    }
  }

  if (payment_method_type) {
    if (payment_method_type.length === 0) {
      errors.push('payment_method_type must be valid.');
    }
  }

  if (trade_pricing_type) {
    if (trade_pricing_type.length === 0) {
      errors.push('trade_pricing_type must be valid.');
    }
  }

  if (trade_pricing_list_at) {
    if (trade_pricing_list_at.length === 0) {
      errors.push('trade_pricing_list_at must be valid.');
    }
  }

  if (trade_pricing_trade_limits_min) {
    if (trade_pricing_trade_limits_min.length === 0) {
      errors.push('trade_pricing_trade_limits_min must be valid.');
    }
  }

  if (trade_pricing_trade_limits_max) {
    if (trade_pricing_trade_limits_max.length === 0) {
      errors.push('trade_pricing_trade_limits_max must be valid.');
    }
  }

  if (trade_pricing_time_limit) {
    if (trade_pricing_time_limit.length === 0) {
      errors.push('trade_pricing_time_limit must be valid.');
    }
  }

  if (trade_instructions_tags) {
    if (trade_instructions_tags.length === 0) {
      errors.push('trade_instructions_tags must be valid.');
    }
  }

  if (trade_instructions_label) {
    if (trade_instructions_label.length === 0) {
      errors.push('trade_instructions_label must be valid.');
    }
  }

  if (trade_instructions_terms) {
    if (trade_instructions_terms.length === 0) {
      errors.push('trade_instructions_terms must be valid.');
    }
  }

  if (trade_instructions_instructions) {
    if (trade_instructions_instructions.length === 0) {
      errors.push('trade_instructions_instructions must be valid.');
    }
  }

  if (is_deleted) {
    if (is_deleted.length === 0) {
      errors.push('is_deleted must be valid.');
    }
  }

  if (when_deleted) {
    if (when_deleted.length === 0) {
      errors.push('when_deleted must be valid.');
    }
  }

  if (created_at) {
    if (created_at.length === 0) {
      errors.push('created_at must be valid.');
    }
  }

  if (updated_at) {
    if (updated_at.length === 0) {
      errors.push('updated_at must be valid.');
    }
  }

  if (associations) {
    if (Array.isArray(associations)) {
      associations.forEach((association) => {
        if (
          association !== 'vendor' &&
          association !== 'cryptocurrency' &&
          association !== 'fiat' &&
          association !== 'payment_method'
        ) {
          errors.push(
            "associations must contain the following associatipn 'vendor', 'cryptocurrency', 'fiat', 'payment_method'",
          );
        }
      });
    }
  }

  if (limit) {
    try {
      Number(limit);
    } catch (err) {
      errors.push('limit must be a number');
    }
    if (limit.length === 0) {
      errors.push('limit must be greater than 0.');
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
