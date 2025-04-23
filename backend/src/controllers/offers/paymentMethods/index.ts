import { Request, Response } from 'express';

import { prisma } from '@/services/db/prisma';
import { sanitize } from '@/utils/sanitizer';

export async function getPaymentMethods(req: Request, res: Response) {
  try {
    const { associations } = req.query;

    const paymentMethods = await prisma.paymentMethod.findMany();

    res.status(200).send(paymentMethods);
  } catch (err) {
    console.log({ err });
    res.status(500).send({
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

    const newPaymentMethod = await prisma.paymentMethod.create({
      data: {
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

    const paymentMethods = await prisma.paymentMethod.findMany({
      where: { paymentMethodCategoryId: cleanCategoryId },
    });

    res.status(200).send(paymentMethods);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
