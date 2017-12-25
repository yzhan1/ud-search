import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

@Controller()
export class UserController {
  
  @Get('/users')
  getAll() {
    return 'Returning all users';
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return `Returning user with id ${ id }`;
  }

  @Post('/users')
  post(@Body() user: any) {
    return 'Saving user';
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return `Updating user with id ${ id }`;
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return `Deleting user with id ${ id }`;
  }

}