import { Router } from 'express';

import {
  getAdminByAdminname,
  getAdminById,
  getAdminController,
  getAdminVerify,
  getAllAdmins,
  getRandomCredentials,
} from '../../controllers/admin';

const router = Router();

router.get('/all', getAllAdmins);

router.get('/id/:userId', getAdminById);

router.get('/username/:username', getAdminByAdminname);

router.get('/get/random/credentials', getRandomCredentials);

router.get('/get', getAdminController);

router.get('/get/verify', getAdminVerify);

export default router;
