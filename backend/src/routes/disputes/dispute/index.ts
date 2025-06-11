import {
  addDisputePartyNote,
  createDispute,
  getDisputeAdmin,
  getDisputeResolutionTypes,
  getDisputeTypes,
  getDisputeUserManagementActions,
  getPreviousDisputePartyNote,
  triggerAction,
} from '@/controllers/disputes/dispute';
import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  validateAddDisputePartyNote,
  validateGetPreviousPartyNote,
} from './middleware';

import { Router } from 'express';

const router = Router();

router.get('/types', authenticateUser, getDisputeTypes);

router.get(
  '/resolution/types/admin',
  authenticateAdmin,
  getDisputeResolutionTypes,
);

router.post('/create', authenticateUser, createDispute);

router.get(
  '/:id/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  getDisputeAdmin,
);

router.post(
  '/party-note/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  validateAddDisputePartyNote,
  addDisputePartyNote,
);

router.get(
  '/party-note/previous/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  validateGetPreviousPartyNote,
  getPreviousDisputePartyNote,
);

router.get(
  '/user-management/actions/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  getDisputeUserManagementActions,
);

router.get(
  '/user-management/trigger/action/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  triggerAction,
);

export default router;
