import {
  authenticate,
  login,
  loginDecodeToken,
  register,
  verifyAccount,
  verifyPrivateKeys,
} from '@/controllers/users/auth';
import {
  validateAccountVerificationRequest,
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

router.get('/verify/:token', validateAccountVerificationRequest, verifyAccount);

router.post(
  '/private-keys/verify',
  validatePrivateKeysRequest,
  verifyPrivateKeys,
);

router.get('/authenticate', authenticateUser, authenticate);

export default router;
