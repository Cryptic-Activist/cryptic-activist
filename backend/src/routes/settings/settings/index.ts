import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';

import { Router } from 'express';
import { getPlatformSettings } from '@/controllers/settings';

const router = Router();

router.get(
  '',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getPlatformSettings,
);

export default router;
