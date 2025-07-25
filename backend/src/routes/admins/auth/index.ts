import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  inviteAdmin,
  login,
  loginDecodeToken,
} from '@/controllers/admins/auth';

import { Router } from 'express';

const router = Router();

router.post('/login', login);

router.get('/login/decode/token/:accessToken', loginDecodeToken);

router.post('/create', login);

router.post(
  '/invite',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  inviteAdmin,
);

export default router;
