import {
  calculateReceivingAmount,
  cancelTrade,
  checkTradePaid,
  createTradeController,
  getTradeController,
  index,
} from '@/controllers/trades';
import {
  validateCalculateReceivingAmount,
  validateCancelTrade,
  validateCreateTrade,
  validateSetPaidTrade,
} from './middleware';

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

router.put('/:id/paid', authenticateUser, checkTradePaid);

router.put('/paid', authenticateUser, validateSetPaidTrade);

router.get('/:id', authenticateUser, getTradeController);

router.get(
  '/calculate-receiving',
  authenticateUser,
  validateCalculateReceivingAmount,
  calculateReceivingAmount,
);

router.get('/:id/details', authenticateUser, index);

export default router;
