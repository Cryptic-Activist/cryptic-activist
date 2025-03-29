import { Router } from 'express';
import { createChatController } from '@/controllers/chats';

const router = Router();

router.post('/create', createChatController);

export default router;
