import { Router } from 'express';
import { ping } from '@/controllers/users/ping';

const router = Router();

router.get('', ping);

export default router;
