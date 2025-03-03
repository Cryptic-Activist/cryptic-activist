import { Router } from 'express';

import {
  createSystemMessageController,
  getSystemMessagesController,
} from '../../controllers/systemMessages';
import { authenticateUser } from '../../middlewares/authorization';
import { validateCreateSystemMessage } from '../../middlewares/validators/request/systemMessages';

const router = Router();

router.get('', authenticateUser, getSystemMessagesController);

router.post(
  '/create',
  authenticateUser,
  validateCreateSystemMessage,
  createSystemMessageController,
);

export default router;
