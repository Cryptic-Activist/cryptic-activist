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

    const newPaymentMethodCategory = await createPaymentMethodCategory({
      where: { id: '' },
      update: {},
      create: cleanName,
    });

    res.status(200).send(newPaymentMethodCategory);
    return;
  } catch (err) {
    res.status(500).send({
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

    res.status(200).send(paymentMethodCategories);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
