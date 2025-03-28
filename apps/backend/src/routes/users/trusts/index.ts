import { Router } from 'express';
import { countTrusts } from '@/controllers/users/trusts';
import { validateCountTrusts } from './middleware';

const router = Router();

router.get('', validateCountTrusts, countTrusts);

export default router;
