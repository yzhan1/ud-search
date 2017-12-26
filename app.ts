import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { WordController } from './controllers/WordController';

const app = createExpressServer({
    controllers: [WordController]
});

app.listen(5000, () => console.log('app started on port 5000'));