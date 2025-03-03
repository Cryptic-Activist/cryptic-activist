import { newSession, test } from '../../controllers/users/tests';

import { Router } from 'express';

const router = Router();

router.get('', test);

router.get('/new-session', newSession);

export default router;
