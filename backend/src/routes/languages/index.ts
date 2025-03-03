import { Router } from 'express';

import {
  indexByUser,
  associateLanguage,
  removeLanguageFromUser,
} from '../../controllers/languages';

import { authenticateUser } from '../../middleware/authorization';
import {
  validateIndexLanguagesByUser,
  validateAssociateLanguageToUser,
  validateRemoveLanguageToUser,
} from '../../middleware/validators/request/users';

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
