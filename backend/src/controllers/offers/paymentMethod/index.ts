import { Request, Response } from 'express';
import { getPaymentMethod, safePaymentMethodValuesAssigner } from 'base-ca';
import { convertWhere, sanitize, sanitizeQueryArray } from 'cryptic-utils';

export const getPaymentMethodController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
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

    return res.status(200).send({
      status_code: 200,
      results: safePaymentMethod,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
};
