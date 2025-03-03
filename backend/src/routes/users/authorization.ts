import { Router } from 'express';

import { authorize } from '../../controllers/users/authorization';

const router = Router();

router.get('/authorize', authorize);

export default router;
