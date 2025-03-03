import { Router } from 'express';

import {
  createCryptocurrencyCoinGecko,
  getCryptocurrencyController,
  getPrice,
} from '@/controllers/cryptocurrency';
import { authenticateUser } from '@/middlewares/authorization';
import {
  validateCreateCryptocurrencyCoinGecko,
  validateGetCryptocurrency,
  validateGetPrice,
} from '@/middlewares/validators/request/cryptocurrency';

const router = Router();

router.get('', validateGetCryptocurrency, getCryptocurrencyController);

router.get('/price', validateGetPrice, getPrice);

router.post(
  '/coin-gecko/create',
  authenticateUser,
  validateCreateCryptocurrencyCoinGecko,
  createCryptocurrencyCoinGecko,
);

export default router;
