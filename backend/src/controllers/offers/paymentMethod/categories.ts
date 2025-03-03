import { Request, Response } from 'express';
import {
  getPaymentMethodCategories,
  createPaymentMethodCategory,
} from 'base-ca';
import { sanitize } from 'cryptic-utils';

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const paymentMethodCategories = await getPaymentMethodCategories(null);

    return res.status(200).send({
      status_code: 200,
      results: paymentMethodCategories,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function createPaymentMethodCategoryController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name } = req.body;

    const cleanName = sanitize({ name }, []);

    const newPaymentMethodCategory = await createPaymentMethodCategory({
      name: cleanName,
    });

    return res.status(200).send({
      status_code: 200,
      results: newPaymentMethodCategory,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function getPaymentMethodCategory(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    // const { id } = req.params;

    // const paymentMethodCategories = await getPaymentMethodByCategory(
    //   { id },
    //   ['payment_method_category'],
    // );

    return res.status(200).send({
      status_code: 200,
      results: {},
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
