import {
  getOffersController,
  getOffersPaginationController,
} from '@/controllers/offers';
import { validateGetOffers, validateGetOffersPagination } from './middleware';

import { Router } from 'express';

const router = Router();

router.get('', validateGetOffers, getOffersController);

router.get(
  '/pagination',
  validateGetOffersPagination,
  getOffersPaginationController,
);

export default router;
