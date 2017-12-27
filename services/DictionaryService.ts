import { Service, Inject, Container } from 'typedi';
import { BadRequestError } from 'routing-controllers';
import { RedisService } from './RedisService';
import axios from 'axios';
import request = require('request');
import { Request } from 'request';

@Service()
export class DictionaryService {

    @Inject()
    private redisService: RedisService;
    private readonly BASE_DEFINE_URL: string = 'http://api.urbandictionary.com/v0/define?';
    private readonly BASE_RANDOM_URL: string = 'http://api.urbandictionary.com/v0/random';

    constructor() {
        this.redisService = Container.get(RedisService);
    }

    getDefinition(term: string): Promise<JSON> {
        const query = `term=${ term }`;
        return this.getDef(query).then((data: JSON) => data);
    }

    getDefinitionWithId(defid: number): Promise<JSON> {
        const query = `defid=${ defid }`;
        return this.getDef(query).then((data: JSON) => data);
    }

    getRandom(): Request {
        return this.fetchApi(this.BASE_RANDOM_URL, (body: JSON) => body);
    }

    private fetchApi(api: string, callback: Function): Request {
        return request(api, (err, res, body) => {
            if (res && res.statusCode === 200) {
                callback(body);
                return JSON.parse(body);
            } else {
                return {
                    'error': 'BadRequestError'
                };
            }
        });
    }

    private getDef(query: string): Promise<any> {
        const reply = this.redisService.find(query);
        return reply.then((data: any) => {
            console.log('data returned from redis is: ' + data);
            if (data) {
                console.log(`found match from redis: ${ data }`);
                return data;
            } else {
                console.log('saving cache to redis');
                return this.fetchApi(this.BASE_DEFINE_URL + query, (data: JSON) => {
                    this.redisService.save(query, data);
                });
            } 
        });
    }

}