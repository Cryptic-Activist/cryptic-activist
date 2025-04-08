import { createChatController, getChatHistory } from '@/controllers/chats';

import { Router } from 'express';

const router = Router();

router.post('/create', createChatController);

router.get('/history/:id', getChatHistory);

export default router;
