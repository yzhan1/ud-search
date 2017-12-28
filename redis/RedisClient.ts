import redis = require('redis');
import bluebird = require('bluebird');
import { factory } from '../config/ConfigLog4j';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export const redisClient = redis.createClient();

const logger = factory.getLogger('RedisClientLogger');

redisClient.on('ready', () => {
    logger.info(() => 'Successfully connected to REDIS and currently READY');
});

redisClient.on('error', () => {
    logger.error(() => 'REDIS has error');
});
