import { createPaymentMethod, getPaymentMethods } from 'base-ca';
import { sanitize } from 'cryptic-utils';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const { associations } = req.query;

    const paymentMethods = await getPaymentMethods({
      offers: false,
      paymentMethodCategory: false,
      _count: false,
    });

    return res.status(200).send({
      status_code: 200,
      results: paymentMethods,
      errors: [],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function createPaymentMethodController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name, paymentMethodCategory } = req.body;
    const { id } = paymentMethodCategory;

    const newPaymentMethod = await createPaymentMethod({
      name,
      paymentMethodCategoryId: id,
    });

    return res.status(200).send({
      status_code: 200,
      results: newPaymentMethod,
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

export async function getPaymentMethodsByCategoryController(
  req: Request,
  res: Response,
): Promise<Response> {
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

    return res.status(200).send({
      status_code: 200,
      results: paymentMethods,
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
