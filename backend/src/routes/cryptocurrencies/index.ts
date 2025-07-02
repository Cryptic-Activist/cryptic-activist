import { Router } from 'express';
import chains from './chains';
import cryptocurrencies from './cryptocurrencies';
import cryptocurrency from './cryptocurrency';

const router = Router();

router.use('', cryptocurrencies);
router.use('/cryptocurrency', cryptocurrency);
router.use('/chains', chains);

export default router;
