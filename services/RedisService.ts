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
        return this.client.hgetallAsync(query).then((res: JSON) => res);
    }

    save(query: string, data: JSON): void {
        this.client.hmset(query, data);
        console.log('query: ' + query);
        console.log('data: ' + data);
    }

}