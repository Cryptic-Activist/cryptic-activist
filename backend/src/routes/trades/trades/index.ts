import {
  getTradesByUserAsTrader,
  getTradesByUserAsVendor,
} from '@/controllers/trades/trades';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.get('/user/:userId/vendor', authenticateUser, getTradesByUserAsVendor);

router.get('/user/:userId/trader', authenticateUser, getTradesByUserAsTrader);

export default router;
