import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';

import { Router } from 'express';
import { deployEscrowSmartContract } from '@/controllers/blockchains/smart-contracts/escrow';

const router = Router();

router.get(
  '/deploy',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  deployEscrowSmartContract,
);

export default router;
