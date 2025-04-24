import {
  addSpokenLanguage,
  removeSpokenLanguage,
} from '@/controllers/users/settings';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.put('/language/add', authenticateUser, addSpokenLanguage);

router.put('/language/remove', authenticateUser, removeSpokenLanguage);

export default router;
