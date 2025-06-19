import {
  authenticateAdmin,
  authenticateUser,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  getDocumentTypes,
  getKYCsAdmin,
  getKYCsAdminFilters,
  getNationalities,
  getTotalApprovedKYC,
  getTotalKYCApplications,
  getTotalPendingKYC,
  getTotalRejectedKYC,
  submitKYC,
} from '@/controllers/users/kyc';

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

export default router;
