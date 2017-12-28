import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DictionaryController } from './controllers/DictionaryController';
import { factory } from './config/ConfigLog4j';

const PORT = process.env.PORT || 5000;

const app = createExpressServer({
    cors: true,
    routePrefix: '/api',
    controllers: [DictionaryController]
});

const logger = factory.getLogger('AppLogger');

app.listen(PORT, () => {
    logger.info(() => `App started on PORT ${ PORT }`);
});