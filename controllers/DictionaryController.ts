import { JsonController, Param, Body, Get } from 'routing-controllers';
import { Service, Inject, Container } from 'typedi';
import { DictionaryService } from '../services/DictionaryService';

@Service()
@JsonController()
export class DictionaryController {

    @Inject()
    private dictionaryService: DictionaryService;

    constructor() {
        this.dictionaryService = Container.get(DictionaryService);
    }

    @Get('/define/:term')
    getDefinition(@Param('term') term: string) {
        return this.dictionaryService.getDefinition(term);
    }

    @Get('/defineid/:defid')
    getDefinitionWithId(@Param('defid') defid: number) {
        return this.dictionaryService.getDefinitionWithId(defid);
    }
  
    @Get('/random')
    getRandom() {
        return this.dictionaryService.getRandom();
    }

}