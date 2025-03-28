import {
  authenticate,
  login,
  loginDecodeToken,
  register,
  verifyPrivateKeys,
} from '@/controllers/users/auth';
import {
  validateLogin,
  validatePrivateKeysRequest,
  validateRegister,
} from './middleware';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.post('/login', validateLogin, login);

router.get(
  '/login/decode/token/:accessToken',
  authenticateUser,
  loginDecodeToken,
);

router.post('/register', validateRegister, register);

router.post(
  '/private-keys/verify',
  validatePrivateKeysRequest,
  verifyPrivateKeys,
);

router.get('/authenticate', authenticateUser, authenticate);

export default router;
