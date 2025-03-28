import { Router } from 'express';
import trade from './trade';
import trades from './trades';

const router = Router();

router.use('', trades);
router.use('/trade', trade);

export default router;
