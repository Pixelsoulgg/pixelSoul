import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { UserUpdateDto } from './dto/userUpdate.dto'
import { UserService } from './user.service'

@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto)
  }
  @Get()
  async findAll() {
    return await this.userService.findAll({})
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto) {
    return await this.userService.update({ id: Number(id) }, userUpdateDto)
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove({ id: Number(id) })
  }
}
