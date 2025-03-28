import { countBlocked, countBlocker } from '@/controllers/users/blocks';

import { Router } from 'express';
import { validateCountBlocks } from './middleware';

const router = Router();

router.get('/blocked', validateCountBlocks, countBlocked);

router.get('/blocker', validateCountBlocks, countBlocker);

export default router;
