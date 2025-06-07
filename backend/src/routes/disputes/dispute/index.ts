import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  getDisputeAdmin,
  getDisputeTypes,
} from '@/controllers/disputes/dispute';

import { Router } from 'express';

const router = Router();

router.get('/types', authenticateUser, getDisputeTypes);

router.get(
  '/:id/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  getDisputeAdmin,
);

export default router;
