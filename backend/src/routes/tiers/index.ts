import { createTier, getNextTier, getTiers } from '@/controllers/tiers';

import { Router } from 'express';

const router = Router();

router.get('', getTiers);

router.post('/create', createTier);

router.get('/:id', getTiers);

router.get('/:userId/next', getNextTier);

export default router;
