import { Service, Inject, Container } from 'typedi';
import { BadRequestError } from 'routing-controllers';
import { RedisService } from './RedisService';
import { Logger } from 'typescript-logging/dist/commonjs/log/standard/Logger';
import { Factory } from '../config/ConfigLog4j';
import { Request } from 'request';
import * as request from 'request';

@Service()
export class DictionaryService {
    private logger: Logger;

    @Inject()
    private redisService: RedisService;
    private readonly BASE_DEFINE_URL: string = 'http://api.urbandictionary.com/v0/define?';
    private readonly BASE_RANDOM_URL: string = 'http://api.urbandictionary.com/v0/random';

    constructor() {
        this.redisService = Container.get(RedisService);
        this.logger = Factory.getLogger('DictionaryServiceLogger');
    }

    getDefinition(term: string): Promise<JSON> {
        const query = `term=${ term }`;
        return this.doQuery(query).then((data: JSON) => data);
    }

    getDefinitionWithId(defid: number): Promise<JSON> {
        const query = `defid=${ defid }`;
        return this.doQuery(query).then((data: JSON) => data);
    }

    getRandom(): Request {
        return this.fetchApi(this.BASE_RANDOM_URL, (body: JSON) => body);
    }

    private fetchApi(api: string, callback: Function): Request {
        return request(api, (err, res, body) => {
            if (res && res.statusCode === 200) {
                this.logger.info(() => `Successfully reached API: ${ api }`);
                const jsonData = JSON.parse(body);
                if (jsonData.result_type !== 'no_results') {
                    this.logger.info(() => 'Results found in API call');
                    callback(body);
                }
                return jsonData;
            } else {
                this.logger.error(() => `BadRequest to API: ${ api }`);
                return {
                    'error': 'BadRequestError'
                };
            }
        });
    }

    private doQuery(query: string): Promise<any> {
        const reply = this.redisService.find(query);
        // return the Promise and parse out the data in main methods
        return reply.then((data: any) => {
            if (data) {
                this.logger.info(() => `Found match for query ${ query } from REDIS: ${ data }`);
                return data;
            } else {
                return this.fetchApi(this.BASE_DEFINE_URL + query, (data: string) => {
                    this.logger.info(() => `Saving query ${ query } to REDIS`);
                    // save the cache in fetchApi's callback
                    this.redisService.save(query, data);
                });
            } 
        });
    }
}