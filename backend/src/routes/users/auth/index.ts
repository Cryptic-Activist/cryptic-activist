import {
  authenticate,
  disable2FA,
  generate2FA,
  login,
  login2FAVerify,
  loginDecodeToken,
  register,
  resetPassword,
  resetPasswordRequest,
  resetPasswordVerifyToken,
  verify2FA,
  verifyAccount,
  verifyPrivateKeys,
} from '@/controllers/users/auth';
import {
  validateLogin,
  validateLogin2FA,
  validatePasswordReset,
  validatePrivateKeysRequest,
  validateRegister,
  validateToken,
} from './middleware';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.post('/login', validateLogin, login);

router.post('/2fa/login', validateLogin2FA, login2FAVerify);

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

router.post('/2fa/generate', authenticateUser, generate2FA);

router.post('/2fa/verify/:token', authenticateUser, verify2FA);

router.put('/2fa/disable/:userId', authenticateUser, disable2FA);

export default router;
