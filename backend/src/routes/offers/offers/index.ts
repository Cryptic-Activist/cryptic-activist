import {
  getOffersByUser,
  getOffersController,
  index,
  indexPagination,
} from '@/controllers/offers';

import { Router } from 'express';

const router = Router();

router.get('/list', index);

router.get('', getOffersController);

router.get('/user/:userId', getOffersByUser);

router.get('/pagination', indexPagination);

export default router;
