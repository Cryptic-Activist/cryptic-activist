import { Router } from 'express';
import admins from './admins';
import adminsAuth from './admins/auth';
import adminsAuthorization from './admins/authorization';
import auth from './auth';
import blocks from './blocks';
import language from './languages';
import trusts from './trusts';
import users from './users';
import usersAuthorization from './users/authorization';

const router = Router();

router.use('/admins', admins);
router.use('/blocks', blocks);
router.use('/users', users);
router.use('/auth', auth);
router.use('/users/authorization', usersAuthorization);
router.use('/admins', admins);
router.use('/admins/auth', adminsAuth);
router.use('/admins/authorization', adminsAuthorization);
router.use('/language', language);
router.use('/blocks', blocks);
router.use('/trusts', trusts);

export default router;
