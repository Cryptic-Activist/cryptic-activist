import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { subscribePremium } from '@/controllers/premium';
import { validateSubscribe } from './middleware';

const router = Router();

router.post(
  '/subscribe',
  authenticateUser,
  validateSubscribe,
  subscribePremium,
);

export default router;
