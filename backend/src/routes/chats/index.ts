import { Router } from 'express';
import chat from './chat';
import systemMessages from './systemMessages';

const router = Router();

router.use('/systemMessages', systemMessages);
router.use('', chat);

export default router;
