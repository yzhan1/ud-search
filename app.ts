import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DictionaryController } from './controllers/DictionaryController';
import redis = require('redis');

const PORT = process.env.PORT || 5000;

// export const redisClient = redis.createClient();

// redisClient.on('ready', () => console.log('redis is ready'));
// redisClient.on('error', () => console.log('redis has error'));

const app = createExpressServer({
    cors: true,
    routePrefix: '/api',
    controllers: [DictionaryController]
});

app.listen(PORT, () => console.log(`app started on port ${ PORT }`));