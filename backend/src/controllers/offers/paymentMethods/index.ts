import { Request, Response } from 'express';
import { createPaymentMethod, getPaymentMethods } from 'base-ca';

import { sanitize } from 'cryptic-utils';

export async function createPaymentMethodController(
  req: Request,
  res: Response,
) {
  try {
    const { name, paymentMethodCategory } = req.body;
    const { id } = paymentMethodCategory;

    const newPaymentMethod = await createPaymentMethod({
      name,
      paymentMethodCategoryId: id,
    });

    res.status(200).send({
      status_code: 200,
      results: newPaymentMethod,
      errors: [],
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

    const paymentMethods = await getPaymentMethods(
      {
        _count: false,
        offers: false,
        paymentMethodCategory: false,
      },
      {
        paymentMethodCategoryId: cleanCategoryId,
      },
    );

    res.status(200).send({
      status_code: 200,
      results: paymentMethods,
      errors: [],
    });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
