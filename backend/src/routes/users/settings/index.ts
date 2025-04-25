import {
  addSpokenLanguage,
  removeSpokenLanguage,
} from '@/controllers/users/settings';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.put('/:id/language/add', authenticateUser, addSpokenLanguage);

router.put('/:id/language/remove', authenticateUser, removeSpokenLanguage);

export default router;
