import { Request, Response } from 'express';
import { convertWhere, sanitize, sanitizeQueryArray } from 'cryptic-utils';
import { getPaymentMethod, safePaymentMethodValuesAssigner } from 'base-ca';

export const getPaymentMethodController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    cleanReqQuery.associations = sanitizeQueryArray(associations);

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    const paymentMethod = await getPaymentMethod(
      { ...where },
      cleanReqQuery.associations,
    );

    const safePaymentMethod = safePaymentMethodValuesAssigner(paymentMethod);

    res.status(200).send({
      ...safePaymentMethod,
    });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
};
