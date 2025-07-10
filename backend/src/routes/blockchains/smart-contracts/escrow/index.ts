import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';

import { Router } from 'express';
import { deployEscrowSmartContract } from '@/controllers/blockchains/smart-contracts/escrow';

const router = Router();

router.post(
  '/deploy',
  // authenticateAdmin,
  // requireAdminRole(['SUPER_ADMIN']),
  deployEscrowSmartContract,
);

export default router;
