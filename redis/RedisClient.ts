import { Factory } from '../config/ConfigLog4j';
import * as Promise from 'bluebird';
import * as redis from 'redis';

const redisAsync: any = Promise.promisifyAll(redis);

// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

export const MyRedisClient = redis.createClient();

const logger = Factory.getLogger('RedisClientLogger');

MyRedisClient.on('ready', () => {
    logger.info(() => 'Successfully connected to REDIS and currently READY');
});

MyRedisClient.on('error', () => {
    logger.error(() => 'REDIS has error');
});
