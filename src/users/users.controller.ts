import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('getuser')
  async getuser() {
    return this.userService.getUser();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async addUser(@Body() body: UserCreateDto) {
    return this.userService.addUser(body);
  }

  @Put(':id/update')
  async updateUser(
      @Param('id', ParseIntPipe ) id:number,
      @Body() body: UserCreateDto
  ){
      return this.userService.update(id, body)
  }
  
}
