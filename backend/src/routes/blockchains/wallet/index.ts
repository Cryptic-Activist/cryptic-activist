import {
  connectWallet,
  getSupportedChains,
  getWalletBalancesController,
} from '@/controllers/blockchains/wallet';

import { Router } from 'express';

const router = Router();

router.post('/connect', connectWallet);

router.get('/supported/chains', getSupportedChains);

router.get('/:walletAddress/:chainId/balance', getWalletBalancesController);

export default router;
