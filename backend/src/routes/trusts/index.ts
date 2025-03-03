import { Router } from 'express';

import { countTrusts } from '../../controllers/trusts';

import { validateCountTrusts } from '../../middleware/validators/request/trusts';

const router = Router();

router.get('', validateCountTrusts, countTrusts);

export default router;
