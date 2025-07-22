import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';

import { Router } from 'express';
import { getDeploymentStats } from '@/controllers/blockchains/smart-contracts/stats';

const router = Router();

router.get(
  '/:chainId/deployment',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getDeploymentStats,
);

export default router;
