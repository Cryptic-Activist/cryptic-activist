import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  deployPremiumSmartContract,
  getPremiumABIFile,
} from '@/controllers/blockchains/smart-contracts/premium';

import { Router } from 'express';

const router = Router();

router.get('/abi', authenticateUser, getPremiumABIFile);

router.post(
  '/deploy',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  deployPremiumSmartContract,
);

export default router;
