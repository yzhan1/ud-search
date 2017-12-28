import { JsonController, Param, Body, Get } from 'routing-controllers';
import { Service, Inject, Container } from 'typedi';
import { DictionaryService } from '../services/DictionaryService';
import { Logger } from 'typescript-logging/dist/commonjs/log/standard/Logger';
import { factory } from '../config/ConfigLog4j';

@Service()
@JsonController()
export class DictionaryController {

    @Inject()
    private dictionaryService: DictionaryService;
    private logger: Logger;

    constructor() {
        this.dictionaryService = Container.get(DictionaryService);
        this.logger = factory.getLogger('ControllerLogger');
    }

    @Get('/define/:term')
    getDefinition(@Param('term') term: string) {
        this.logger.info(() => `GET /define/:term ---- Param term: ${ term }`);
        return this.dictionaryService.getDefinition(term);
    }

    @Get('/defineid/:defid')
    getDefinitionWithId(@Param('defid') defid: number) {
        this.logger.info(() => `GET /defineid/:defid ---- Param defid: ${ defid }`);
        return this.dictionaryService.getDefinitionWithId(defid);
    }
  
    @Get('/random')
    getRandom() {
        this.logger.info(() => `GET /random`);
        return this.dictionaryService.getRandom();
    }

}