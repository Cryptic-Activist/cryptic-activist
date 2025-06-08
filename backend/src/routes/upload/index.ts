import { upload, uploadFile } from '@/controllers/upload';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.post('/public', upload.array('files'), authenticateUser, uploadFile);

export default router;
