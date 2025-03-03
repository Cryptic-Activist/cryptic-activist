import { Router } from 'express';

import { countBlocked, countBlocker } from '../../controllers/blocks';

import { validateCountBlocks } from '../../middleware/validators/request/blocks';

const router = Router();

router.get('/blocked', validateCountBlocks, countBlocked);

router.get('/blocker', validateCountBlocks, countBlocker);

export default router;
