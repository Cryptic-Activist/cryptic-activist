import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  deployEscrowSmartContract,
  getEscrowABIFile,
} from '@/controllers/blockchains/smart-contracts/escrow';

import { Router } from 'express';

const router = Router();

router.get('/abi', authenticateUser, getEscrowABIFile);

router.post(
  '/deploy',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  deployEscrowSmartContract,
);

export default router;
