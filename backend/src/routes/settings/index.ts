import { Router } from 'express';
import privateSettings from './public';
import publicSettings from './public';
import settings from './settings';

const router = Router();

router.use('/public', publicSettings);

router.use('/private', privateSettings);

router.use('', settings);

export default router;
