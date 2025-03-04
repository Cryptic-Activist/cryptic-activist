import {
  createCryptocurrencyCoinGecko,
  getCryptocurrencyController,
  getPrice,
} from '@/controllers/cryptocurrencies';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.get('', getCryptocurrencyController);

router.get('/price', getPrice);

router.post(
  '/coin-gecko/create',
  authenticateUser,
  createCryptocurrencyCoinGecko,
);

export default router;
