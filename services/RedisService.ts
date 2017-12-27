import { Service } from 'typedi';
import { RedisClient } from 'redis';

@Service()
export class RedisService {

    private client: RedisClient;

    constructor() {
        this.client = require('../redis/RedisClient');
    }

    find(query: string): JSON {
        console.log(this.client);
        this.client.get(query, (err: any, reply: string) => {
            console.log(JSON.parse(reply));
            return JSON.parse(reply);
        });
    }

    save(query: string, data: JSON): boolean {
        return this.client.setex(query, 3600, data.toString());
    }

}