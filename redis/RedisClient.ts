import redis = require('redis');

export const redisClient = redis.createClient();

redisClient.on('ready', () => console.log('redis is ready'));
redisClient.on('error', () => console.log('redis has error'));
