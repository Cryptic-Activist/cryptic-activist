import { Router } from 'express';
import publicSettings from './public';

const router = Router();

router.use('/public', publicSettings);

export default router;
