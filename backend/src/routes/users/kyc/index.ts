import { getDocumentTypes, getNationalities } from '@/controllers/users/kyc';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.get('/nationalities', authenticateUser, getNationalities);

router.get('/document/types', authenticateUser, getDocumentTypes);

export default router;
