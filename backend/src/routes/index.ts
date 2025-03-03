import { Application } from 'express';
import admins from './admins';
import adminsAuth from './admins/auth';
import adminsAuthorization from './admins/authorization';
import blocks from './blocks';
import language from './languages';
import ping from './ping';
import tests from './tests';
import trusts from './trusts';
import users from './users';
import usersAuth from './users/auth';
import usersAuthorization from './users/authorization';

export default (app: Application): void => {
  app.use('/ping', ping);

  app.use('/users', users);
  app.use('/users/auth', usersAuth);
  app.use('/users/authorization', usersAuthorization);

  app.use('/admins', admins);
  app.use('/admins/auth', adminsAuth);
  app.use('/admins/authorization', adminsAuthorization);

  app.use('/language', language);

  app.use('/blocks', blocks);
  app.use('/trusts', trusts);

  app.use('/tests', tests);
};
