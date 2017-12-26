import { Service } from 'typedi';
import request = require('request');

@Service()
export class WordService {

    getDefinition(term: string) {
        request(`http://api.urbandictionary.com/v0/define?term=${ term }`, (err, res, body) => {
            if (res && res.statusCode == 200)
                console.log(body);
                return body;
        });
        return null;
    }

    getDefinitionWithId(defid: number) {
        request(`http://api.urbandictionary.com/v0/define?defid=${ defid }`, (err, res, body) => {
            if (res && res.statusCode == 200)
                console.log(body);
                return body;
        });
        return null;
    }

    getRandom() {
        request('http://api.urbandictionary.com/v0/random', (err, res, body) => {
            if (res && res.statusCode == 200)
                console.log(body);
                return body;
        });
        return ['hello', 'world'];
    }

}