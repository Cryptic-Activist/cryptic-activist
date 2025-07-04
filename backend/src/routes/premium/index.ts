import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { subscribe } from '@/controllers/premium';
import { validateSubscribe } from './middleware';

const router = Router();

router.post('/subscribe', authenticateUser, validateSubscribe, subscribe);

export default router;
