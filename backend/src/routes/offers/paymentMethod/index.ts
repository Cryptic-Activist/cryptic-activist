import { Router } from 'express';
import { getPaymentMethodController } from '@/controllers/offers';

const router = Router();

router.get('', getPaymentMethodController);

export default router;
