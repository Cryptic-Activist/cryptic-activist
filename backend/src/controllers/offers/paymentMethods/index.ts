import { Request, Response } from 'express';
import {
  createPaymentMethod,
  getPaymentMethods as getPaymentMethodsCB,
} from 'base-ca';

import { sanitize } from 'cryptic-utils';

export async function getPaymentMethods(req: Request, res: Response) {
  try {
    const { associations } = req.query;

    const paymentMethods = await getPaymentMethodsCB({
      select: { offers: false, paymentMethodCategory: false, _count: false },
    });

    res.status(200).send(paymentMethods);
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function createPaymentMethodController(
  req: Request,
  res: Response,
) {
  try {
    const { name, paymentMethodCategory } = req.body;
    const { id } = paymentMethodCategory;

    const newPaymentMethod = await createPaymentMethod({
      where: { id: '' },
      update: {},
      create: {
        name,
        paymentMethodCategory: {
          connect: { id },
        },
      },
    });

    res.status(200).send({
      ...newPaymentMethod,
    });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function getPaymentMethodsByCategoryController(
  req: Request,
  res: Response,
) {
  try {
    const { categoryId } = req.params;

    const cleanCategoryId = sanitize(categoryId, []);

    const paymentMethods = await getPaymentMethodsCB({
      where: { paymentMethodCategoryId: cleanCategoryId },
    });

    res.status(200).send(paymentMethods);
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
