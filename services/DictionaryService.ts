import { Service, Inject, Container } from 'typedi';
import { BadRequestError } from 'routing-controllers';
import { RedisService } from './RedisService';
import axios from 'axios';
import redis = require('redis');

@Service()
export class DictionaryService {

    @Inject()
    private redisService: RedisService;
    private readonly BASE_DEFINE_URL: string = 'http://api.urbandictionary.com/v0/define?';
    private readonly BASE_RANDOM_URL: string = 'http://api.urbandictionary.com/v0/random';

    constructor() {
        this.redisService = Container.get(RedisService);
    }

    getDefinition(term: string): JSON {
        const query = `term=${ term }`;
        let cache: JSON = this.redisService.find(query);
        if (cache) {
            console.log('found match from redis');
            return cache;
        } else {
            this.fetchApi(this.BASE_DEFINE_URL + query)
                .then(res => cache = res.data)
                .catch(err => BadRequestError);
            this.redisService.save(query, cache);
            return cache;
        }
    }

    getDefinitionWithId(defid: number): Promise<any> {
        const query = `defid=${ defid }`;
        return this.fetchApi(this.BASE_DEFINE_URL + query)
            .then(res => res.data)
            .catch(err => BadRequestError);
    }

    getRandom(): Promise<any> {
        return this.fetchApi(this.BASE_RANDOM_URL)
            .then(res => res.data)
            .catch(err => BadRequestError);
    }

    private fetchApi(api: string): Promise<any> {
        return axios.get(api);
    }

}