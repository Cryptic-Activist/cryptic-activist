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
  getTradesAdmin,
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
  '/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  getTradesAdmin,
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
