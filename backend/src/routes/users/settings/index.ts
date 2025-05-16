import {
  addSpokenLanguage,
  emailChange,
  removeSpokenLanguage,
  requestEmailChange,
} from '@/controllers/users/settings';
import { validateEmailChange, validateRequestEmailChange } from './middleware';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.put('/:id/language/add', authenticateUser, addSpokenLanguage);

router.put('/:id/language/remove', authenticateUser, removeSpokenLanguage);

router.post(
  '/:userId/email/request',
  authenticateUser,
  validateRequestEmailChange,
  requestEmailChange,
);

router.get(
  '/email/change/:token',
  authenticateUser,
  validateEmailChange,
  emailChange,
);

export default router;
