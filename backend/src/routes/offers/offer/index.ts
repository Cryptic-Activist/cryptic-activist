import { Router } from 'express';

import {
  createOfferController,
  getOfferController,
} from '../../controllers/offer';

import {
  validateGetOffer,
  validateInputCreateOffer,
} from '../../middlewares/validators/request/offers';

const router = Router();

router.get('', validateGetOffer, getOfferController);

router.post(
  '/create',
  // authenticateUser,
  validateInputCreateOffer,
  createOfferController,
);

export default router;
