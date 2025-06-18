import {
  getDocumentTypes,
  getNationalities,
  submitKYC,
} from '@/controllers/users/kyc';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { validateSubmitKYC } from './middleware';

const router = Router();

router.get('/nationalities', authenticateUser, getNationalities);

router.get('/document/types', authenticateUser, getDocumentTypes);

router.post('/submit', authenticateUser, validateSubmitKYC, submitKYC);

export default router;
