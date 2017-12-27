import { Service } from 'typedi';
import { RedisClient } from 'redis';
import { redisClient } from '../redis/RedisClient'; 

@Service()
export class RedisService {

    private client: RedisClient;

    constructor() {
        this.client = redisClient;
    }

    find(query: string): Promise<JSON> {
        console.log(query);
        return this.client.getAsync(query).then((res: string) => JSON.parse(res));
    }

    save(query: string, data: string): void {
        this.client.set(query, data);
        console.log('query: ' + query);
        console.log('data: ' + data);
    }

}