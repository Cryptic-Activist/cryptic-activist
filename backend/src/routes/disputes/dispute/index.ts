import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { getDisputeTypes } from '@/controllers/disputes/dispute';

const router = Router();

router.get('/types', authenticateUser, getDisputeTypes);

export default router;
