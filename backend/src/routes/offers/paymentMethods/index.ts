import {
  createPaymentMethodController,
  getPaymentMethods,
  getPaymentMethodsByCategoryController,
} from '@/controllers/offers/paymentMethods';

import { Router } from 'express';

const router = Router();

router.get('', getPaymentMethods);

router.post('/create', createPaymentMethodController);

router.get('/:categoryId/all', getPaymentMethodsByCategoryController);

export default router;
