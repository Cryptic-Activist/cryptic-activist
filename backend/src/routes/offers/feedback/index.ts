import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { createFeedbackController } from '@/controllers/offers';
import { validateInputCreateFeedback } from '@/middlewares/offers/validators/offers';

const router = Router();

router.post('/create', authenticateUser, createFeedbackController);

export default router;
