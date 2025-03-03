import { Router } from 'express';

import { createFeedbackController } from '../../controllers/feedback';
import { authenticateUser } from '../../middlewares/authorization';
import { validateInputCreateFeedback } from '../../middlewares/validators/request/feedback';

const router = Router();

router.post(
  '/create',
  authenticateUser,
  validateInputCreateFeedback,
  createFeedbackController,
);

export default router;
