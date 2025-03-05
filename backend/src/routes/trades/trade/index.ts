import {
  cancelTrade,
  createTradeController,
  getTradeController,
  index,
} from '@/controllers/trades';
import {
  validateCancelTrade,
  validateCreateTrade,
  validateGetTrade,
  validateSetPaidTrade,
} from '@/utils/validators/request/trader';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.get('/index', index);

router.post(
  '/create',
  authenticateUser,
  validateCreateTrade,
  createTradeController,
);

router.put('/cancel', authenticateUser, validateCancelTrade, cancelTrade);

router.put('/paid', authenticateUser, validateSetPaidTrade);

router.get('/get/:id', authenticateUser, getTradeController);

export default router;
