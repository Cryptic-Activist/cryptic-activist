import { Router } from 'express';
import cryptocurrencies from './cryptocurrencies';
import cryptocurrency from './cryptocurrency';

const router = Router();

router.use('', cryptocurrencies);
router.use('/cryptocurrency', cryptocurrency);

export default router;
