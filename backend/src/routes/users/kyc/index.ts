import {
  approveKYCAdmin,
  getDocumentTypes,
  getKYCDetailsAdmin,
  getKYCsAdmin,
  getKYCsAdminFilters,
  getNationalities,
  getTotalApprovedKYC,
  getTotalKYCApplications,
  getTotalPendingKYC,
  getTotalRejectedKYC,
  rejectKYCAdmin,
  submitKYC,
} from '@/controllers/users/kyc';
import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';

import { Router } from 'express';
import { validateSubmitKYC } from './middleware';

const router = Router();

router.get('/nationalities', authenticateUser, getNationalities);

router.get('/document/types', authenticateUser, getDocumentTypes);

router.post('/submit', authenticateUser, validateSubmitKYC, submitKYC);

router.get('/applications/admin', authenticateAdmin, getKYCsAdmin);

router.get('/pending/total', authenticateAdmin, getTotalPendingKYC);

router.get('/approved/total', authenticateAdmin, getTotalApprovedKYC);

router.get('/rejected/total', authenticateAdmin, getTotalRejectedKYC);

router.get('/applications/total', authenticateAdmin, getTotalKYCApplications);

router.get(
  '/filters/:filter/admin',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'DISPUTE_MANAGER']),
  getKYCsAdminFilters,
);

router.get(
  '/:id/details/:adminId/details',
  authenticateAdmin,
  getKYCDetailsAdmin,
);

router.post('/:id/approve', authenticateAdmin, approveKYCAdmin);

router.post('/:id/reject', authenticateAdmin, rejectKYCAdmin);

export default router;
