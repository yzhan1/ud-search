import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './UserController';

const app = createExpressServer({
    controllers: [UserController]
});

app.listen(3000, () => {
    console.log('app started on port 3000');
});