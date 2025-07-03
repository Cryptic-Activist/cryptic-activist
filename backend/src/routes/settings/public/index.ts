import { Router } from 'express';
import { getPublicPlatformSettings } from '@/controllers/settings';

const router = Router();

router.get('', getPublicPlatformSettings);

export default router;
