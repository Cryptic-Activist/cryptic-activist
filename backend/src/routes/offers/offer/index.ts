import {
  createOfferController,
  deleteOffer,
  editOffer,
  getEditOffer,
  getOfferController,
} from '@/controllers/offers';
import { validateCreateOffer, validateEditOffer } from './middleware';

import { Router } from 'express';
import { authenticateUser } from '@/middlewares/authorization';

const router = Router();

router.get('/:id', getOfferController);

router.post(
  '/create',
  authenticateUser,
  validateCreateOffer,
  createOfferController,
);

router.get('/:userId/:offerId', authenticateUser, getEditOffer);

router.get(
  '/:userId/:offerId/edit',
  authenticateUser,
  validateEditOffer,
  editOffer,
);

router.delete('/:userId/:offerId', authenticateUser, deleteOffer);

export default router;
