import 'dotenv/config';
import '@/sentry/instrument';

import Sentry from '@sentry/node';
import { Server } from 'socket.io';
import { connectDB } from '@/services/db';
import { createServer } from 'node:http';
import { expireTimer } from '@/middlewares/cron';
import express from 'express';
import middleware from '@/middlewares';
import routes from '@/routes';
import { setIO } from '@/services/socket';
import socketHandler from '@/socket';
import { startEmailConsumer } from './services/rabbitmq';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Sentry.setupExpressErrorHandler(app);

setIO(io);
socketHandler(io);

middleware(app);

routes(app);

connectDB();

startEmailConsumer().then();

expireTimer();

export default server;
