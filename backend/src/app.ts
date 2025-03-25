import 'dotenv/config';

import { Server } from 'socket.io';
import { createServer } from 'node:http';
import express from 'express';
import middleware from '@/middlewares';
import routes from '@/routes';
import socketHandler from '@/socket';

const app = express();
const server = createServer(app);
const io = new Server(server);

socketHandler(io);

middleware(app);

routes(app);

export default server;
