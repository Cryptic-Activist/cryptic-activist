import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  connectWallet,
  createAdminWallet,
  getSuperAdminArbitratorWallets,
  getSupportedChains,
  getUserWallets,
  softDeleteAdminWallet,
} from '@/controllers/blockchains/wallet';
import {
  validateCreateAdminWallet,
  validateGetAdminArbitratorWallet,
  validateSoftDeleteAdminWallet,
} from './middleware';

import { Router } from 'express';

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

router.get(
  '/users/wallets',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getUserWallets,
);

router.post(
  '/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  validateCreateAdminWallet,
  createAdminWallet,
);

router.delete(
  '/admin/wallet/:walletId',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  validateSoftDeleteAdminWallet,
  softDeleteAdminWallet,
);

export default router;
