import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { GameDto } from './dto/game.dto'
import { GameService } from './game.service'
@Controller({
  path: 'game',
  version: '1'
})
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Post()
  async create(@Body() gameDto: GameDto) {
    return await this.gameService.create(gameDto)
  }
  @Get()
  async findAll() {
    return await this.gameService.findAll({})
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() gamesUpdateDto: GameDto) {
    return await this.gameService.update({ id: Number(id) }, gamesUpdateDto)
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.gameService.remove({ id: Number(id) })
  }
}
