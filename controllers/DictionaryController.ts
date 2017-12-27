import { JsonController, Param, Body, Get } from 'routing-controllers';
import { Service, Inject, Container } from 'typedi';
import { WordService } from '../services/WordService';

// @Service()
@JsonController()
export class DictionaryController {

    @Inject()
    wordService: WordService;

    constructor() {
        this.wordService = Container.get(WordService);
    }

    @Get('/define/:term')
    getDefinition(@Param('term') term: string) {
        return this.wordService.getDefinition(term);
    }

    @Get('/defineid/:defid')
    getDefinitionWithId(@Param('defid') defid: number) {
        return this.wordService.getDefinitionWithId(defid);
    }
  
    @Get('/random')
    getRandom() {
        return this.wordService.getRandom();
    }

}