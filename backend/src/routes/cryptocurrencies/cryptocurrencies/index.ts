import { Router } from 'express';

import {
  createCryptocurrenciesCoinGecko,
  index,
  indexCoinGecko,
} from '@/controllers/cryptocurrencies';

const router = Router();

router.get('', index);

router.get('/coin-gecko', indexCoinGecko);

router.post(
  '/coin-gecko/create',
  // authenticateUser,
  createCryptocurrenciesCoinGecko,
);

export default router;
