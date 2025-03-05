import {
  createOfferController,
  getOfferController,
} from '@/controllers/offers';

import { Router } from 'express';

const router = Router();

router.get('', getOfferController);

router.post('/create', createOfferController);

export default router;
