import * as path from 'path';
import { Controller, Param, Req, Get, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from 'typescript-logging/dist/commonjs/log/standard/Logger';
import { Factory } from '../config/ConfigLog4j';

@Service()
@Controller()
export class IndexController {
    private logger: Logger;
    
    constructor() {
        this.logger = Factory.getLogger('IndexControllerLogger');
    }

    @Get('*')
    getDefinition(@Req() request: any, @Res() response: any) {
        this.logger.info(() => 'Sending index.html');
        return response.send(path.join(__dirname + '../client/build/index.html'));
    }
}