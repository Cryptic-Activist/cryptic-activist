import { Router } from 'express';
import { subscribeNotification } from '@/controllers/chats';

const router = Router();

router.post('/subscribe', subscribeNotification);

export default router;
