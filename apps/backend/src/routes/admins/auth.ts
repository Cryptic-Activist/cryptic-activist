import { login, loginDecodeToken, register } from '@/controllers/admin/auth';

import { Router } from 'express';

const router = Router();

router.post('/login', login);

router.get('/login/decode/token/:accessToken', loginDecodeToken);

router.post('/register', register);

export default router;
