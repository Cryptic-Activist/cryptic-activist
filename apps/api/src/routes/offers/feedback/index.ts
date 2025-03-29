import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { createFeedback } from '@/controllers/offers';

const router = Router();

router.post('/create', authenticateUser, createFeedback);

export default router;
