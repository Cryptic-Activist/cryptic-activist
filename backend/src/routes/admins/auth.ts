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
} from '../../controllers/admins/auth';

const router = Router();

router.post('/login', validateLogin, login);

router.get(
  '/login/decode/token/:accessToken',
  authenticateUser,
  loginDecodeToken,
);

router.post('/register', validateRegister, register);

export default router;
