import { JsonController, Param, Body, Get } from 'routing-controllers';

@JsonController()
export class WordController {

    @Get('/api/define/:term')
    getDefinition(@Param('term') term: string) {
        return `term ${ term }`;
    }

    @Get('/api/defineid/:defid')
    getDefinitionWithId(@Param('defid') defid: number) {
        return {
            'word': 'hello'
        };
    }
  
    @Get('/api/random')
    getRandom() {
        return [
            {
                'word': 'hi'
            },
            {
                'word2': 'hello'
            }
        ];
    }

}