import {
  countFeedbacksController,
  getFeedbacksByUser,
  indexFeedbacks,
  indexFeedbacksPagination,
} from '@/controllers/offers';

import { Router } from 'express';

const router = Router();

router.post('', indexFeedbacks);

router.get('/user/:userId', getFeedbacksByUser);

router.post('/count', countFeedbacksController);

router.post('/pagination', indexFeedbacksPagination);

export default router;
