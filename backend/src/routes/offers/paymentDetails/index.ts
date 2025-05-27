import {
  createPaymentDetails,
  getPaymentDetailsByUserController,
} from '@/controllers/offers/paymentDetails';

import { Router } from 'express';

const router = Router();

router.post('/create', createPaymentDetails);

router.get('/:userId', getPaymentDetailsByUserController);

export default router;
