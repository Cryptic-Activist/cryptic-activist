import {
  getCurrentVendorOffers,
  getMyOffersPaginationController,
  getOffersController,
  getOffersPaginationController,
} from '@/controllers/offers';
import {
  validateGetCurrentVendorOffers,
  validateGetMyOffersPagination,
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

router.get(
  '/:userId/pagination',
  validateGetMyOffersPagination,
  getMyOffersPaginationController,
);

export default router;
