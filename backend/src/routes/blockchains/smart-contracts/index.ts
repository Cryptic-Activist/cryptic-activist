import { Router } from 'express';
import escrow from './escrow';
import premium from './premium';

const router = Router();

router.use('/escrow', escrow);
router.use('/premium', premium);

export default router;
