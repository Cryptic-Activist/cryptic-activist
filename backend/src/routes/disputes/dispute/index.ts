import {
  addDisputePartyNote,
  addResolutionDecision,
  cancelTradeByModerator,
  createDispute,
  getDisputeAdmin,
  getDisputeResolutionTypes,
  getDisputeTypes,
  getDisputeUserManagementActions,
  getPreviousDisputePartyNote,
  resolveInTraderFavor,
  resolveInVendorFavor,
  triggerAction,
} from '@/controllers/disputes/dispute';
import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  validateAddDisputePartyNote,
  validateAddResolutionDecision,
  validateCancelTradeByModerator,
  validateGetPreviousPartyNote,
  validateResolveInFavor,
} from './middleware';

import { Router } from 'express';

const router = Router();

router.get('/types', authenticateUser, getDisputeTypes);

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
  '/resolution/types/admin',
  authenticateAdmin,
  getDisputeResolutionTypes,
);

router.post(
  '/resolution/add/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  validateAddResolutionDecision,
  addResolutionDecision,
);

router.post(
  '/resolution/favor/trader/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  validateResolveInFavor,
  resolveInTraderFavor,
);

router.post(
  '/resolution/favor/vendor/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  validateResolveInFavor,
  resolveInVendorFavor,
);

router.post(
  '/resolution/trade/cancel/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  validateCancelTradeByModerator,
  cancelTradeByModerator,
);

router.get(
  '/user-management/actions/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  getDisputeUserManagementActions,
);

router.post(
  '/user-management/trigger/actions/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  triggerAction,
);

router.get(
  '/user-management/trigger/action/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  triggerAction,
);

export default router;
