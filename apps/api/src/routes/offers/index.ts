import { Router } from 'express';
import feedback from './feedback';
import feedbacks from './feedbacks';
import offer from './offer';
import offers from './offers';
import paymentMethod from './paymentMethod';
import paymentMethodCategories from './paymentMethod/categories';
import paymentMethods from './paymentMethods';

const router = Router();

router.use('', offers);
router.use('/offer', offer);
router.use('/feedback', feedback);
router.use('/feedbacks', feedbacks);
router.use('/payment-method', paymentMethod);
router.use('/payment-method/categories', paymentMethodCategories);
router.use('/payment-methods', paymentMethods);

export default router;
