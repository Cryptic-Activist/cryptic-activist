import { Router } from 'express';

import { authorize } from '../../controllers/admins/authorization';

const router = Router();

router.get('/authorize', authorize);

export default router;
