import 'dotenv/config';
import '@/sentry/instrument';

import Sentry from '@sentry/node';
import { Server } from 'socket.io';
import { connectDB } from '@/services/db';
import { createServer } from 'node:http';
import express from 'express';
import middleware from '@/middlewares';
import routes from '@/routes';
import socketHandler from '@/socket';

const app = express();
const server = createServer(app);
const io = new Server(server);

Sentry.setupExpressErrorHandler(app);

socketHandler(io);

middleware(app);

routes(app);

connectDB();

export default server;
