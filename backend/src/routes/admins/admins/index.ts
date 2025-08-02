import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  getAdminByAdminname,
  getAdminById,
  getAdminController,
  getAdminVerify,
  getAllAdmins,
  getRandomCredentials,
  getSuperAdmins,
} from '@/controllers/admins/admins';

import { Router } from 'express';

const router = Router();

router.get(
  '/:id/all',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getAllAdmins,
);

router.get(
  '/super-admins',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getSuperAdmins,
);

export default router;
