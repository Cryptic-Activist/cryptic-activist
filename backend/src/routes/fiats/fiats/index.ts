import {
  createFiatController,
  createFiatsJSON,
  index,
} from '@/controllers/fiats';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.get('', index);

router.post('/create', authenticateUser, createFiatController);

router.post('/json/create', createFiatsJSON);

export default router;
