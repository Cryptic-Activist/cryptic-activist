import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  deployEscrowERC20SmartContract,
  deployEscrowNativeTokenSmartContract,
  getEscrowERC20Details,
  getEscrowNativeTokenDetails,
} from '@/controllers/blockchains/smart-contracts/escrow';

import { Router } from 'express';

const router = Router();

router.get('/erc20/details', authenticateUser, getEscrowERC20Details);

router.post(
  '/erc20/deploy',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  deployEscrowERC20SmartContract,
);

router.get('/native/details', authenticateUser, getEscrowNativeTokenDetails);

router.post(
  '/native/deploy',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  deployEscrowNativeTokenSmartContract,
);

export default router;
