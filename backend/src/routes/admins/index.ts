import { Router } from 'express';
import admins from './admins';
import auth from './auth';

const router = Router();

router.use('', admins);
router.use('/auth', auth);

export default router;
