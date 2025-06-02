import { login, loginDecodeToken } from '@/controllers/admin/auth';

import { Router } from 'express';

const router = Router();

router.post('/login', login);

router.get('/login/decode/token/:accessToken', loginDecodeToken);

export default router;
