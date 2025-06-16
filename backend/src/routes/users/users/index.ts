import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  getAllUsers,
  getRandomCredentials,
  getTotalUsers,
  getUserById,
  getUserByUsername,
  getUserController,
  getUserVerify,
  getUsersController,
} from '@/controllers/users';

import { Router } from 'express';
import { validateGetUserRequest } from './middleware';

const router = Router();

router.get('/all', getAllUsers);

router.get('/id/:userId', getUserById);

router.get('/username/:username', getUserByUsername);

router.get('/random/credentials', getRandomCredentials);

router.get('/get', validateGetUserRequest, getUserController);

router.get('/get/users', validateGetUserRequest, getUsersController);

router.get('/get/verify', validateGetUserRequest, getUserVerify);

router.get(
  '/total',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN']),
  getTotalUsers,
);

export default router;
