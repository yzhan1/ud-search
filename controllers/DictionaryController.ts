import { JsonController, Param, Body, Get } from 'routing-controllers';
import { Service, Inject, Container } from 'typedi';
import { DictionaryService } from '../services/DictionaryService';
import { Logger } from 'typescript-logging/dist/commonjs/log/standard/Logger';
import { Factory } from '../config/ConfigLog4j';

@Service()
@JsonController()
export class DictionaryController {
    private logger: Logger;

    @Inject()
    private dictionaryService: DictionaryService;
    
    constructor() {
        this.dictionaryService = Container.get(DictionaryService);
        this.logger = Factory.getLogger('DictionaryControllerLogger');
    }

    @Get('/api/define/:term')
    getDefinition(@Param('term') term: string) {
        this.logger.info(() => `GET /define/:term ---- Param term: ${ term }`);
        return this.dictionaryService.getDefinition(term);
    }

    @Get('/api/defineid/:defid')
    getDefinitionWithId(@Param('defid') defid: number) {
        this.logger.info(() => `GET /defineid/:defid ---- Param defid: ${ defid }`);
        return this.dictionaryService.getDefinitionWithId(defid);
    }
  
    @Get('/api/random')
    getRandom() {
        this.logger.info(() => 'GET /random');
        return this.dictionaryService.getRandom();
    }
}