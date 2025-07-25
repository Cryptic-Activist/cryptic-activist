import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  deployPremiumSmartContract,
  getPremiumDetails,
  getPremiumSmartContractBalance,
} from '@/controllers/blockchains/smart-contracts/premium';

import { Router } from 'express';

const router = Router();

router.get('/details', authenticateUser, getPremiumDetails);

router.get('/balance', getPremiumSmartContractBalance);

router.post(
  '/deploy',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  deployPremiumSmartContract,
);

export default router;
