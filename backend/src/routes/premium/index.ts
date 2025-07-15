import {
  changeToMonthlyPremiumSubscription,
  changeToYearlyPremiumSubscription,
  subscribePremium,
} from '@/controllers/premium';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { validateSubscribe } from './middleware';

const router = Router();

router.post(
  '/subscribe',
  authenticateUser,
  validateSubscribe,
  subscribePremium,
);

router.post(
  '/subscription/change/monthly',
  authenticateUser,
  validateSubscribe,
  changeToMonthlyPremiumSubscription,
);

router.post(
  '/subscription/change/yearly',
  authenticateUser,
  validateSubscribe,
  changeToYearlyPremiumSubscription,
);

export default router;
