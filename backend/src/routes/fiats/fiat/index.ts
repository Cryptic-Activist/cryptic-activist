import { Router } from 'express';

import { getFiatController } from '../../controllers/fiat';

const router = Router();

router.get('', getFiatController);

export default router;
