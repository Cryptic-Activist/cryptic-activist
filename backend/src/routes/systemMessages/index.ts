import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { getSystemMessagesController } from '@/controllers/systemMessages';

const router = Router();

router.get('/:userId', authenticateUser, getSystemMessagesController);

export default router;
