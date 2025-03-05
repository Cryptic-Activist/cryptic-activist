import {
  createCryptocurrenciesCoinGecko,
  index,
  indexCoinGecko,
} from '@/controllers/cryptocurrencies';

import { Router } from 'express';

const router = Router();

router.get('', index);

router.get('/coin-gecko', indexCoinGecko);

router.post('/coin-gecko/create', createCryptocurrenciesCoinGecko);

export default router;
