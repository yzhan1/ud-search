import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DictionaryController } from './controllers/DictionaryController';

const app = createExpressServer({
    cors: true,
    routePrefix: '/api',
    controllers: [DictionaryController]
});

app.listen(5000, () => console.log('app started on port 5000'));