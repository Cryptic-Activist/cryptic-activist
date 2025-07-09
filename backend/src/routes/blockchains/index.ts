import { Router } from 'express';
import smartContracts from './smart-contracts';
import wallet from './wallet';

const router = Router();

router.use('/smart-contracts', smartContracts);
router.use('/wallet', wallet);

export default router;
