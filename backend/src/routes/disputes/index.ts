import { Router } from 'express';
import dispute from './dispute';

const router = Router();

router.use('/dispute', dispute);

export default router;
