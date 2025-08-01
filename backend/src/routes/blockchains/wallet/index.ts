import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  connectWallet,
  getSuperAdminArbitratorWallets,
  getSupportedChains,
} from '@/controllers/blockchains/wallet';

import { Router } from 'express';
import { validateGetAdminArbitratorWallet } from './middleware';

const router = Router();

router.post('/connect', connectWallet);

router.get('/supported/chains', getSupportedChains);

router.get(
  '/admin/:adminId/arbitrator/wallets',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  validateGetAdminArbitratorWallet,
  getSuperAdminArbitratorWallets,
);

export default router;
