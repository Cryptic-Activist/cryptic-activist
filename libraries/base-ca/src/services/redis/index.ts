import * as redis from 'redis';

import { REDIS_HOST, REDIS_PORT } from '@/constants/envs';

const redisClient = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

redisClient
  .connect()
  .then(() =>
    console.log(`Redis Connected: ${REDIS_HOST}:${REDIS_PORT}`)
  )
  .catch(console.error);

export { redisClient };
