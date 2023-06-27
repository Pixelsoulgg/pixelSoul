import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { GameDto } from './dto/game.dto'
import { GameService } from './game.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from '../roles/roles.decorator'
@ApiTags('game')
@Controller({
  path: 'game',
  version: '1'
})
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  async create(@Body() gameDto: GameDto) {
    return await this.gameService.create(gameDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return await this.gameService.findAll({})
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() gamesUpdateDto: GameDto) {
    return await this.gameService.update({ id: Number(id) }, gamesUpdateDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.gameService.remove({ id: Number(id) })
  }
}
