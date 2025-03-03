import { Router } from 'express';

import { test, newSession } from '../../controllers/tests';

const router = Router();

router.get('', test);

router.get('/new-session', newSession);

export default router;
