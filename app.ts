import 'reflect-metadata';
import * as path from 'path';
import * as express from 'express';
import { createExpressServer } from 'routing-controllers';
import { DictionaryController } from './controllers/DictionaryController';
import { IndexController } from './controllers/IndexController';
import { Factory } from './config/ConfigLog4j';

const PORT = process.env.PORT || 5000;

const app = createExpressServer({
    cors: true,
    controllers: [
        DictionaryController
    ]
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const logger = Factory.getLogger('AppLogger');

app.listen(PORT, () => {
    logger.info(() => `App started on PORT ${ PORT }`);
});