import { JsonController, Param, Body, Get } from 'routing-controllers';
import { Service } from 'typedi';
import { WordService } from '../services/WordService';
import request = require('request');

@Service()
@JsonController()
export class DictionaryController {

    constructor(protected wordService: WordService) { }

    @Get('/api/define/:term')
    getDefinition(@Param('term') term: string) {
        return this.wordService.getDefinition(term);
    }

    @Get('/api/defineid/:defid')
    getDefinitionWithId(@Param('defid') defid: number) {
        return this.wordService.getDefinitionWithId(defid);
    }
  
    @Get('/api/random')
    getRandom() {
        return this.wordService.getRandom();
    }

}