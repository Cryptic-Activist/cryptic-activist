import { Router } from 'express';

import { authenticateUser } from '../../middleware/authorization';
import {
  validateLogin,
  validatePrivateKeysRequest,
  validateRegister,
} from '../../middleware/validators/request/users/auth';

import {
  login,
  register,
  loginDecodeToken,
  verifyPrivateKeys,
} from '../../controllers/users1/auth';

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

export default router;
