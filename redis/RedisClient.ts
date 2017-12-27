import redis = require('redis');
import bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export const redisClient = redis.createClient();

redisClient.on('ready', () => console.log('redis is live'));
redisClient.on('error', () => console.log('redis has error'));
