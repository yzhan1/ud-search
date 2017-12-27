import axios from 'axios';
import { Service } from 'typedi';
import { BadRequestError } from 'routing-controllers';

@Service()
export class WordService {

    getDefinition(term: string) {
        return this.fetchApi(`http://api.urbandictionary.com/v0/define?term=${ term }`)
            .then(res => res.data)
            .catch(err => BadRequestError);
    }

    getDefinitionWithId(defid: number) {
        return this.fetchApi(`http://api.urbandictionary.com/v0/define?defid=${ defid }`)
            .then(res => res.data)
            .catch(err => BadRequestError);
    }

    getRandom() {
        return this.fetchApi('http://api.urbandictionary.com/v0/random')
            .then(res => res.data)
            .catch(err => BadRequestError);
    }

    private fetchApi(api: string) {
        return axios.get(api);
    }

    private checkRedis(query: string) {
        // TODO

    }

}