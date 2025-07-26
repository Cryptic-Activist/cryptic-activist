import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  inviteAdmin,
  login,
  loginDecodeToken,
  softDeleteAdmin,
  toggleAdminActivation,
  updateAdmin,
} from '@/controllers/admins/auth';

import { Router } from 'express';

const router = Router();

router.post('/login', login);

router.get('/login/decode/token/:accessToken', loginDecodeToken);

router.post(
  '/invite',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  inviteAdmin,
);

router.put(
  '/:id',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  updateAdmin,
);

router.delete(
  '/:id',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  softDeleteAdmin,
);

router.put(
  '/:id/toggle/activation',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  toggleAdminActivation,
);

export default router;
