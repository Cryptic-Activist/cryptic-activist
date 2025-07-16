import {
  connectWallet,
  getSupportedChains,
  saveABIs,
} from '@/controllers/blockchains/wallet';

import { Router } from 'express';

const router = Router();

router.post('/connect', connectWallet);

router.get('/supported/chains', getSupportedChains);

router.post('/abis', saveABIs);

export default router;
