import { Router } from 'express';
import trade from './trade';
import trades from './trades';

const router = Router();

router.use('/trade', trade);
router.use('/trades', trades);

export default router;
