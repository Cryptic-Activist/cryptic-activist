import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  deployEscrowERC20SmartContract,
  deployEscrowNativeTokenSmartContract,
  getEscrowERC20ABIFile,
  getEscrowNativeTokenABIFile,
} from '@/controllers/blockchains/smart-contracts/escrow';

import { Router } from 'express';

const router = Router();

router.get('/erc20/abi', authenticateUser, getEscrowERC20ABIFile);

router.post(
  '/erc20/deploy',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  deployEscrowERC20SmartContract,
);

router.get('/native/abi', authenticateUser, getEscrowNativeTokenABIFile);

router.post(
  '/native/deploy',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  deployEscrowNativeTokenSmartContract,
);

export default router;
