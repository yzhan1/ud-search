import * as path from 'path';
import { Controller, Param, Req, Get, Res, Render } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from 'typescript-logging/dist/commonjs/log/standard/Logger';
import { Factory } from '../config/ConfigLog4j';

@Service()
@Controller()
export class IndexController {
    private logger: Logger;
    private static readonly indexUrl: string = path.join(__dirname, '..', '/client/build/index.html');
    
    constructor() {
        this.logger = Factory.getLogger('IndexControllerLogger');
    }

    @Get('*')
    @Render(IndexController.indexUrl)
    getDefinition(@Req() request: any, @Res() response: any) {
        this.logger.info(() => `Sending ${ IndexController.indexUrl }`);
    }
}