import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ summary: 'Create User' })
  create(@Body() userDTO: UserDTO){
    return this.userService.create(userDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Return all Users' })
  findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search User by Id' })
  findOne(@Param('id') id: string){
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  update(@Param('id') id: string, @Body() userDTO: UserDTO){
    return this.userService.update(id, userDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
