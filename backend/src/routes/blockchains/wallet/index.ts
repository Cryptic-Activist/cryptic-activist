import {
  connectWallet,
  getSupportedChains,
} from '@/controllers/blockchains/wallet';

import { Router } from 'express';

const router = Router();

router.post('/connect', connectWallet);

router.get('/supported/chains', getSupportedChains);

export default router;
