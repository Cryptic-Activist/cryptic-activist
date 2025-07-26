import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  inviteAdmin,
  login,
  loginDecodeToken,
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

router.put('/:id', updateAdmin);

export default router;
