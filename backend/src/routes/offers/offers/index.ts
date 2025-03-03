import { Router } from 'express';

import {
  getOffersByUser,
  getOffersController,
  index,
  indexPagination,
} from '../../controllers/offers';

import {
  validateGetOffer,
  validateInputIndexPagination,
} from '../../middlewares/validators/request/offers';

const router = Router();

router.get('/list', index);

router.get('', validateGetOffer, getOffersController);

router.get('/user/:userId', getOffersByUser);

router.get('/pagination', validateInputIndexPagination, indexPagination);

export default router;
