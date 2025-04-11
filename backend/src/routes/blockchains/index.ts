import { Router } from 'express';
import ethereum from './ethereum';

const router = Router();

router.use('/ethereum', ethereum);

export default router;
