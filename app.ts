import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DictionaryController } from './controllers/DictionaryController';

const PORT = process.env.PORT || 5000;

const app = createExpressServer({
    cors: true,
    routePrefix: '/api',
    controllers: [DictionaryController]
});

app.listen(PORT, () => console.log(`app started on port ${ PORT }`));