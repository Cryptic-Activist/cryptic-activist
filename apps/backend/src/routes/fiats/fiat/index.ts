import { Router } from 'express';
import { getFiatController } from '@/controllers/fiats';

const router = Router();

router.get('', getFiatController);

export default router;
