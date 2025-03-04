import {
  login,
  loginDecodeToken,
  register,
  verifyPrivateKeys,
} from '../../controllers/users1/auth';
import {
  validateLogin,
  validatePrivateKeysRequest,
  validateRegister,
} from '../../middlewares/validators/request/users/auth';

import { Router } from 'express';
import { authenticateUser } from '../../middlewares/authorization';

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
