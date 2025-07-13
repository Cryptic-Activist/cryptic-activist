import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';

import { Router } from 'express';
import { getPrivatePlatformSettings } from '@/controllers/settings';

const router = Router();

router.get('', getPrivatePlatformSettings);

router.post('/create', authenticateAdmin, requireAdminRole(['SUPER_ADMIN']));

router.post('/update', authenticateAdmin, requireAdminRole(['SUPER_ADMIN']));

export default router;
