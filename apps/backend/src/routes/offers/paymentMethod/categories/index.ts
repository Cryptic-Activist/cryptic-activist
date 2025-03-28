import {
  createPaymentMethodCategoryController,
  getPaymentMethodCategories,
} from '@/controllers/offers';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { validateCreatePaymentMethodCategory } from './middleware';

const router = Router();

router.get('', getPaymentMethodCategories);

router.post(
  '/create',
  // authenticateUser,
  validateCreatePaymentMethodCategory,
  createPaymentMethodCategoryController,
);

export default router;
