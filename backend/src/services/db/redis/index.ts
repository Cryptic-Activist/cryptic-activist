import * as redis from 'redis';

import { REDIS_HOST, REDIS_PORT } from '@/constants/env';

const redisClient = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    connectTimeout: 10000, // Wait up to 10s to connect
    reconnectStrategy: (retries) => {
      if (retries > 5) {
        console.error('❌ Redis reconnect failed after 5 retries.');
        return new Error('Too many Redis connection retries');
      }
      return Math.min(retries * 1000, 5000); // Exponential backoff up to 5s
    },
  },
});

redisClient.on('connect', () => {
  console.log(`✅ Redis connecting to ${REDIS_HOST}:${REDIS_PORT}...`);
});

redisClient.on('ready', () => {
  console.log(`🚀 Redis ready on ${REDIS_HOST}:${REDIS_PORT}`);
});

redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

redisClient.on('reconnecting', () => {
  console.warn('🔄 Redis reconnecting...');
});

redisClient.connect().catch((err) => {
  console.error('❌ Redis initial connection failed:', err);
});

export { redisClient };
