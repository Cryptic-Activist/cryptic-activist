import { Router } from 'express';
import ethereum from './ethereum';
import wallet from './wallet';

const router = Router();

router.use('/ethereum', ethereum);
router.use('/wallet', wallet);

export default router;
