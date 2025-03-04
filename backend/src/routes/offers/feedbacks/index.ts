import {
  countFeedbacksController,
  getFeedbacksByUser,
  indexFeedbacks,
  indexFeedbacksPagination,
} from '@/controllers/offers';

import { Router } from 'express';
import { validateInputCountFeedbacks } from '@/middlewares/validators/request/feedbacks';

const router = Router();

router.post('', indexFeedbacks);

router.get('/user/:userId', getFeedbacksByUser);

router.post('/count', countFeedbacksController);

router.post('/pagination', indexFeedbacksPagination);

export default router;
