import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DictionaryController } from './controllers/DictionaryController';
import { IndexController } from './controllers/IndexController';
import { Factory } from './config/ConfigLog4j';

const PORT = process.env.PORT || 5000;

const app = createExpressServer({
    cors: true,
    controllers: [
        DictionaryController,
        IndexController
    ]
});

const logger = Factory.getLogger('AppLogger');

app.listen(PORT, () => {
    logger.info(() => `App started on PORT ${ PORT }`);
});