import { Router } from 'express';
import feedback from './feedback';
import feedbacks from './feedbacks';
import offer from './offer';
import offers from './offers';
import paymentMethod from './paymentMethod';
import paymentMethods from './paymentMethods';

const router = Router();

router.use('/feedback', feedback);
router.use('/feedbacks', feedbacks);
router.use('/offer', offer);
router.use('/offers', offers);
router.use('/payment-method', paymentMethod);
router.use('/payment-methods', paymentMethods);

export default router;
