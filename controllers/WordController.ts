import { JsonController, Param, Body, Get } from 'routing-controllers';
import request = require('request');

@JsonController()
export class WordController {

    @Get('/api/define/:term')
    getDefinition(@Param('term') term: string) {
        request(`http://api.urbandictionary.com/v0/define?term=${ term }`, (err, res, body) => {
            if (res && res.statusCode == 200)
                console.log(body);
                return body;
        });
        return `term ${ term }`;
    }

    @Get('/api/defineid/:defid')
    getDefinitionWithId(@Param('defid') defid: number) {
        request(`http://api.urbandictionary.com/v0/define?defid=${ defid }`, (err, res, body) => {
            if (res && res.statusCode == 200)
                console.log(body);
                return body;
        });
        return null;
    }
  
    @Get('/api/random')
    getRandom() {
        request('http://api.urbandictionary.com/v0/random', (err, res, body) => {
            if (res && res.statusCode == 200)
                console.log(body);
                return body;
        });
        return ['hello', 'world'];
    }

}