import { Router } from 'express';
import { deployEscrowSmartContract } from '@/controllers/blockchains/smart-contracts/escrow';

const router = Router();

router.post('/deploy', deployEscrowSmartContract);

export default router;
