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
} from '@/controllers/admins/admins';

import { Router } from 'express';

const router = Router();

router.get(
  '/all',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getAllAdmins,
);

export default router;
