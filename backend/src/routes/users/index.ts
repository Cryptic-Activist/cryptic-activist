import { Router } from 'express';
import auth from './auth';
import blocks from './blocks';
import language from './languages';
import trusts from './trusts';
import users from './users';

const router = Router();

router.use('/blocks', blocks);
router.use('/users', users);
router.use('/auth', auth);
router.use('/language', language);
router.use('/blocks', blocks);
router.use('/trusts', trusts);

export default router;
