import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  getPrivatePlatformSettings,
  updatePrivatePlatformSettings,
} from '@/controllers/settings';

import { Router } from 'express';

const router = Router();

router.get('', getPrivatePlatformSettings);

router.put(
  '/update',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  updatePrivatePlatformSettings,
);

export default router;
