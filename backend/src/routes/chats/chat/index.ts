import { Router } from 'express';

import { createChatController } from '../../controllers/chat';

const router = Router();

router.post('/create', createChatController);

export default router;
