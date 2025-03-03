import { Router } from 'express';

import {
  createPaymentMethodCategoryController,
  index,
} from '../../controllers/paymentMethods/categories';

// import { authenticateUser } from '../../middlewares/authorization';

const router = Router();

router.get('', index);

// router.post(
//   '/create',
//   authenticateUser,
//   validateInputCreatePaymentMethodCategory,
//   createPaymentMethodCategoryController,
// );
router.post(
  '/create',
  // validateInputCreatePaymentMethodCategory,
  createPaymentMethodCategoryController,
);

export default router;
