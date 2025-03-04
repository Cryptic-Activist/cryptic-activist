import { Router } from 'express';
import cryptocurrencies from './cryptocurrencies';
import cryptocurrency from './cryptocurrency';

const router = Router();

router.use('/cryptocurrency', cryptocurrency);
router.use('/cryptocurrencies', cryptocurrencies);

export default router;
