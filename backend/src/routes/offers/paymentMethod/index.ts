import { Router } from 'express';

import { getPaymentMethodController } from '../../controllers/paymentMethod';

const router = Router();

router.get('', getPaymentMethodController);

export default router;
