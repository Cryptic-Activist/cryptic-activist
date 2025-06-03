import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  getRecentTrades,
  getTotalCompletedTrades,
  getTotalTradeVolume,
  getTotalTrades,
  getTradesByUserAsTrader,
  getTradesByUserAsVendor,
} from '@/controllers/trades/trades';

import { Router } from 'express';

const router = Router();

router.get('/user/:userId/vendor', authenticateUser, getTradesByUserAsVendor);

router.get('/user/:userId/trader', authenticateUser, getTradesByUserAsTrader);

router.get(
  '/recent',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getRecentTrades,
);

router.get(
  '/total',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getTotalTrades,
);

router.get(
  '/completed/total',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getTotalCompletedTrades,
);

router.get(
  '/volume',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getTotalTradeVolume,
);

export default router;
