import { Service } from 'typedi';
import { RedisClient } from 'redis';
import { MyRedisClient } from '../redis/RedisClient'; 
import { Logger } from 'typescript-logging/dist/commonjs/log/standard/Logger';
import { Factory } from '../config/ConfigLog4j';

@Service()
export class RedisService {

    private client: RedisClient;
    private logger: Logger;

    constructor() {
        this.client = MyRedisClient;
        this.logger = Factory.getLogger('RedisLogger');
    }

    find(query: string): Promise<JSON> {
        this.logger.info(() => `Querying REDIS for query: ${ query }`);
        return this.client.getAsync(query).then((res: string) => JSON.parse(res));
    }

    save(query: string, data: string): boolean {
        this.logger.info(() => `Saving k-v pair for ${ query }`);
        return this.client.set(query, data);
    }

}