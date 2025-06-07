import { Router } from 'express';
import dispute from './dispute';
import disputes from './disputes';

const router = Router();

router.use('', disputes);

router.use('/dispute', dispute);

export default router;
