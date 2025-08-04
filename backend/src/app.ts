import 'dotenv/config';
import '@/sentry/instrument';

import { Server } from 'socket.io';
import { connectDB } from '@/services/db';
import { createServer } from 'node:http';
import express from 'express';
import middleware from '@/middlewares';
import routes from '@/routes';
import { runCronJobs } from '@/middlewares/cron';
import { setIO } from '@/services/socket';
import socketHandler from '@/socket';
import { startEmailConsumer } from '@/services/rabbitmq';
import { subscribeToTradeTimers } from '@/services/db/redis/subscribers';

const app = express();
const server = createServer(app);
const io = new Server(server);

setIO(io);
socketHandler(io);

middleware(app);

routes(app);

connectDB();

// RabbitMQ - Queues
startEmailConsumer().then();

runCronJobs().then();

subscribeToTradeTimers();

export default server;
