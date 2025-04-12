import { Router } from 'express';
import { connectWallet } from '@/controllers/blockchains/wallet';

const router = Router();

router.post('/connect', connectWallet);

export default router;
