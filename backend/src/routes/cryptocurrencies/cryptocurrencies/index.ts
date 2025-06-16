import {
  createAcceptedCryptocurrencyCoinGecko,
  createCryptocurrenciesCoinGecko,
  getCryptocurrencyFilters,
  index,
  indexCoinGecko,
} from '@/controllers/cryptocurrencies';

import { Router } from 'express';

const router = Router();

router.get('', index);

router.get('/coin-gecko', indexCoinGecko);

router.post('/coin-gecko/create', createCryptocurrenciesCoinGecko);

router.post('/accepted/create', createAcceptedCryptocurrencyCoinGecko);

router.get('/filters', getCryptocurrencyFilters);

export default router;
