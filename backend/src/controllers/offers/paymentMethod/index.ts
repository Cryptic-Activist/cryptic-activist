import { Request, Response } from 'express';
import { sanitize, sanitizeQueryArray } from '@/utils/sanitizer';

import { convertWhere } from '@/utils/object';
import { prisma } from '@/services/db';

export const getPaymentMethodController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    cleanReqQuery.associations = sanitizeQueryArray(associations);

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    const paymentMethod = await prisma.paymentMethod.findFirst({ ...where });

    res.status(200).send(paymentMethod);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
