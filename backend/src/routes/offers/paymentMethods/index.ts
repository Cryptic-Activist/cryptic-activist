import { Router } from 'express';

import {
  createPaymentMethodController,
  getPaymentMethodsByCategoryController,
  index,
} from '../../controllers/paymentMethods';

import {
  validateInputCreatePaymentMethod,
  validateInputGetPaymentMethodsByCategory,
} from '../../middlewares/validators/request/paymentMethods';

const router = Router();

router.get('', index);

router.post(
  '/create',
  validateInputCreatePaymentMethod,
  createPaymentMethodController,
);

router.get(
  '/:categoryId/all',
  // authenticateUser,
  validateInputGetPaymentMethodsByCategory,
  getPaymentMethodsByCategoryController,
);

export default router;
