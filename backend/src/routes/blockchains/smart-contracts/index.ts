import { Router } from 'express';
import escrow from './escrow';
import premium from './premium';
import stats from './stats';

const router = Router();

router.use('/stats', stats);
router.use('/escrow', escrow);
router.use('/premium', premium);

export default router;
