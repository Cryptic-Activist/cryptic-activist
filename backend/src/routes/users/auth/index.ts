import {
  authenticate,
  login,
  loginDecodeToken,
  register,
  resetPassword,
  resetPasswordRequest,
  resetPasswordVerifyToken,
  verifyAccount,
  verifyPrivateKeys,
} from '@/controllers/users/auth';
import {
  validateLogin,
  validatePasswordReset,
  validatePrivateKeysRequest,
  validateRegister,
  validateToken,
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

router.get('/verify/:token', validateToken, verifyAccount);

router.post('/password/reset', resetPasswordRequest);

router.get(
  '/password/reset/verify/:token',
  validateToken,
  resetPasswordVerifyToken,
);

router.post(
  '/password/reset/:token',
  validateToken,
  validatePasswordReset,
  resetPassword,
);

router.post(
  '/private-keys/verify',
  validatePrivateKeysRequest,
  verifyPrivateKeys,
);

router.get('/authenticate', authenticateUser, authenticate);

export default router;
