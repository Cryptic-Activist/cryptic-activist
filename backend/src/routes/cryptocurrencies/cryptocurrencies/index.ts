import {
  createAcceptedCryptocurrencyCoinGecko,
  createCryptocurrenciesCoinGecko,
  getCryptocurrencyFilters,
  getSupportedTokens,
  index,
  indexCoinGecko,
} from '@/controllers/cryptocurrencies';

import { Router } from 'express';
import { validateGetSupportedTokens } from './middleware';

const router = Router();

router.get('', index);

router.get('/coin-gecko', indexCoinGecko);

router.post('/coin-gecko/create', createCryptocurrenciesCoinGecko);

router.post('/accepted/create', createAcceptedCryptocurrencyCoinGecko);

router.get('/filters', getCryptocurrencyFilters);

router.get(
  '/supported/:chainId/tokens',
  validateGetSupportedTokens,
  getSupportedTokens,
);

export default router;
