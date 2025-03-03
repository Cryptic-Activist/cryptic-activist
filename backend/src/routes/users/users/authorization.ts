import { Router } from 'express';

import { authorize } from '../../controllers/users1/authorization';

const router = Router();

router.get('/authorize', authorize);

export default router;
