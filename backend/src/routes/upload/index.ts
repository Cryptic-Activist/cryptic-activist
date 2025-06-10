import { upload, uploadFile } from '@/controllers/upload';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';
import { validateUploadFiles } from './middleware';

const router = Router();

router.post(
  '/public',
  upload.array('files'),
  authenticateUser,
  validateUploadFiles,
  uploadFile,
);

export default router;
