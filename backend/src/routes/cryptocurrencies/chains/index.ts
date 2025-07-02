import { Router } from 'express';
import { getChains } from '@/controllers/cryptocurrencies/chains';

const router = Router();

router.get('', getChains);

export default router;
