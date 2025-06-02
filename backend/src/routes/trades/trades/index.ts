import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  getTradesByUserAsTrader,
  getTradesByUserAsVendor,
} from '@/controllers/trades/trades';

import { Router } from 'express';

const router = Router();

router.get('/user/:userId/vendor', authenticateUser, getTradesByUserAsVendor);

router.get('/user/:userId/trader', authenticateUser, getTradesByUserAsTrader);

router.get(
  '/trades/recent',
  authenticateAdmin,
  // requireAdminRole('SUPER_ADMIN'),
  getTradesByUserAsTrader,
);

export default router;
