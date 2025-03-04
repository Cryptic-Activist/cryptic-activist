import {
  login,
  loginDecodeToken,
  register,
} from '../../controllers/admin/auth';
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

export default router;
