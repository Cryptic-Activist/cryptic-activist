import { Router } from 'express';
import { getAltchaChallenge } from '@/controllers/altcha';

const router = Router();

router.get('/challenge', getAltchaChallenge);

export default router;
