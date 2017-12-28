import { Service, Inject, Container } from 'typedi';
import { BadRequestError } from 'routing-controllers';
import { RedisService } from './RedisService';
import { Logger } from 'typescript-logging/dist/commonjs/log/standard/Logger';
import { factory } from '../config/ConfigLog4j';
import { Request } from 'request';
import request = require('request');
import { log } from 'util';


@Service()
export class DictionaryService {

    @Inject()
    private redisService: RedisService;
    private logger: Logger;
    private readonly BASE_DEFINE_URL: string = 'http://api.urbandictionary.com/v0/define?';
    private readonly BASE_RANDOM_URL: string = 'http://api.urbandictionary.com/v0/random';

    constructor() {
        this.redisService = Container.get(RedisService);
        this.logger = factory.getLogger('DictionaryServiceLogger');
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
                this.logger.info(() => `Successfully reached API: ${ api }`);
                callback(body);
                return JSON.parse(body);
            } else {
                this.logger.error(() => `BadRequest to API: ${ api }`);
                return {
                    'error': 'BadRequestError'
                };
            }
        });
    }

    private getDef(query: string): Promise<any> {
        const reply = this.redisService.find(query);
        return reply.then((data: any) => {
            if (data) {
                this.logger.info(() => `Found match for query ${ query } from REDIS: ${ data }`);
                return data;
            } else {
                this.logger.info(() => `Saving query ${ query } to REDIS`);
                return this.fetchApi(this.BASE_DEFINE_URL + query, (data: string) => {
                    this.redisService.save(query, data);
                });
            } 
        });
    }

}