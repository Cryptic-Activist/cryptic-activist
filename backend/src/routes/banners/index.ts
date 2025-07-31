import {
  authenticateAdmin,
  requireAdminRole,
} from '@/middlewares/authorization';
import {
  createBanner,
  deleteBanner,
  getBannerById,
  getBanners,
  getDisplayBanners,
  updateBanner,
} from '@/controllers/banners';

import { Router } from 'express';
import { validateCreateBanner } from './middleware';

const router = Router();

router.post(
  '',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'SENIOR_ADMIN']),
  validateCreateBanner,
  createBanner,
);

router.get(
  '',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'SENIOR_ADMIN']),
  getBanners,
);

router.get('/display', getDisplayBanners);

router.get(
  '/:id',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'SENIOR_ADMIN']),
  getBannerById,
);

router.put(
  '/:id',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'SENIOR_ADMIN']),
  updateBanner,
);

router.delete(
  '/:id',
  authenticateAdmin,
  requireAdminRole(['SUPER_ADMIN', 'SENIOR_ADMIN']),
  deleteBanner,
);

export default router;
