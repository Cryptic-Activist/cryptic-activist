import { Router } from 'express';
import fiat from './fiat';
import fiats from './fiats';

const router = Router();

router.use('/fiat', fiat);
router.use('/fiats', fiats);

export default router;
