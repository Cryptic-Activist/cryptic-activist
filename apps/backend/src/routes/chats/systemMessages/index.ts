import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { getSystemMessagesController } from '@/controllers/chats';

const router = Router();

router.get('', authenticateUser, getSystemMessagesController);

export default router;
