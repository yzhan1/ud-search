import { Factory } from '../config/ConfigLog4j';
import redis = require('redis');
import bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export const MyRedisClient = redis.createClient();

const logger = Factory.getLogger('RedisClientLogger');

MyRedisClient.on('ready', () => {
    logger.info(() => 'Successfully connected to REDIS and currently READY');
});

MyRedisClient.on('error', () => {
    logger.error(() => 'REDIS has error');
});
