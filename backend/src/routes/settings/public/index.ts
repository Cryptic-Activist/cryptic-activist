import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  getPublicPlatformSettings,
  updatePublicPlatformSettings,
} from '@/controllers/settings';

import { Router } from 'express';

const router = Router();

router.get('', getPublicPlatformSettings);

router.put(
  '/update',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  updatePublicPlatformSettings,
);

export default router;
