import { Router } from 'express';

import { authorize } from '../../controllers/admin/authorization';

const router = Router();

router.get('/authorize', authorize);

export default router;
