import { Router } from 'express';
import auth from './auth';
import blocks from './blocks';
import language from './languages';
import settings from './settings';
import trusts from './trusts';
import users from './users';

const router = Router();

router.use('', users);
router.use('/blocks', blocks);
router.use('/auth', auth);
router.use('/language', language);
router.use('/blocks', blocks);
router.use('/trusts', trusts);
router.use('/settings', settings);

export default router;
