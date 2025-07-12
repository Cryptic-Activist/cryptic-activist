import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';

import { Router } from 'express';
import { deployPremiumSmartContract } from '@/controllers/blockchains/smart-contracts/premium';

const router = Router();

router.post(
  '/deploy',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  deployPremiumSmartContract,
);

export default router;
