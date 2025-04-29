import { Router } from 'express';
import { getFeedbacksByUser } from '@/controllers/feedbacks';

const router = Router();

router.get('/:userId', getFeedbacksByUser);

export default router;
