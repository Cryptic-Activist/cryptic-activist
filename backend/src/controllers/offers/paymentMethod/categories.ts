import { Request, Response } from 'express';

import { prisma } from '@/services/db/prisma';
import { sanitize } from '@/utils/sanitizer';

export const createPaymentMethodCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name } = req.body;

    const cleanName = sanitize({ name }, []);

    const newPaymentMethodCategory = await prisma.paymentMethodCategory.create({
      data: cleanName,
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

    const paymentMethodCategories =
      await prisma.paymentMethodCategory.findMany();

    res.status(200).send(paymentMethodCategories);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
