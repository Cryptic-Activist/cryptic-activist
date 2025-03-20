import { Request, Response } from 'express';
import { convertWhere, sanitize, sanitizeQueryArray } from 'cryptic-utils';

import { getPaymentMethod } from 'base-ca';

export const getPaymentMethodController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    cleanReqQuery.associations = sanitizeQueryArray(associations);

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    const paymentMethod = await getPaymentMethod({ ...where });

    res.status(200).send(paymentMethod);
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
};
