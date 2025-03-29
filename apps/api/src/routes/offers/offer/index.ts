import {
  createOfferController,
  getOfferController,
} from '@/controllers/offers';

import { Router } from 'express';
import { validateCreateOffer } from './middleware';

const router = Router();

router.get('/:id', getOfferController);

router.post('/create', validateCreateOffer, createOfferController);

export default router;
