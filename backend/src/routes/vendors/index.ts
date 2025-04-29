import { Router } from 'express';
import { getVendor } from '@/controllers/vendor';

const router = Router();

router.get('/:id', getVendor);

export default router;
