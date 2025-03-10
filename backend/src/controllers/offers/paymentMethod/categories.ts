import { Request, Response } from 'express';
import {
  createPaymentMethodCategory,
  getPaymentMethodCategories as getPaymentMethodCategoriesBaseCa,
} from 'base-ca';

import { sanitize } from 'cryptic-utils';

export const createPaymentMethodCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name } = req.body;

    const cleanName = sanitize({ name }, []);

    const newPaymentMethodCategory =
      await createPaymentMethodCategory(cleanName);

    res.status(200).send({
      status_code: 200,
      results: newPaymentMethodCategory,
      errors: [],
    });
    return;
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
    return;
  }
};

export const getPaymentMethodCategories = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const paymentMethodCategories = await getPaymentMethodCategoriesBaseCa({});

    res.status(200).send({
      status_code: 200,
      results: paymentMethodCategories,
      errors: [],
    });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
};
