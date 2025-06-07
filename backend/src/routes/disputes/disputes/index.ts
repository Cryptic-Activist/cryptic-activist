import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  getDisputesAdmin,
  getDisputesAdminFilters,
} from '@/controllers/disputes';

import { Router } from 'express';

const router = Router();

router.get(
  '/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  getDisputesAdmin,
);

router.get(
  '/filters/:filter/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  getDisputesAdminFilters,
);

export default router;
