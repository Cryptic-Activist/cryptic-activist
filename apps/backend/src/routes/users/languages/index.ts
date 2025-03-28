import {
  associateLanguage,
  indexByUser,
  removeLanguageFromUser,
} from '@/controllers/users/languages';
import {
  validateAssociateLanguageToUser,
  validateIndexLanguagesByUser,
  validateRemoveLanguageToUser,
} from './middleware';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.get(
  '/:user_id',
  authenticateUser,
  validateIndexLanguagesByUser,
  indexByUser,
);

router.post(
  '/associate/:user_id',
  authenticateUser,
  validateAssociateLanguageToUser,
  associateLanguage,
);

router.delete(
  '/remove/:user_id',
  authenticateUser,
  validateRemoveLanguageToUser,
  removeLanguageFromUser,
);

export default router;
