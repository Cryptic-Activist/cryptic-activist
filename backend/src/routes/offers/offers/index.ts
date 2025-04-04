import {
  getCurrentVendorOffers,
  getOffersController,
  getOffersPaginationController,
} from '@/controllers/offers';
import {
  validateGetCurrentVendorOffers,
  validateGetOffers,
  validateGetOffersPagination,
} from './middleware';

import { Router } from 'express';

const router = Router();

router.get('', validateGetOffers, getOffersController);

router.get(
  '/vendor/:id',
  validateGetCurrentVendorOffers,
  getCurrentVendorOffers,
);

router.get(
  '/pagination',
  validateGetOffersPagination,
  getOffersPaginationController,
);

export default router;
