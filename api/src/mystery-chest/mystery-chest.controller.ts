import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { MysteryChestService } from './mystery-chest.service'
import { OpenChestDto } from './dto/mystery-chest.open.dto'
import { AuthGuard } from '@nestjs/passport'
@ApiTags('mystery chest')
@Controller({ version: '1', path: 'mystery-chest' })
export class MysteryChestController {
  constructor(private mysteryChestService: MysteryChestService) {}
  @Get(':auth0Sub')
  async findAllByUser(@Param('auth0Sub') auth0Sub: string) {
    return await this.mysteryChestService.findAll(auth0Sub)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('claim/:auth0Sub')
  async claim(@Param('auth0Sub') auth0Sub: string) {
    return await this.mysteryChestService.claim(auth0Sub)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('open')
  async open(@Body() data: OpenChestDto) {
    return await this.mysteryChestService.openMysteryChest(data)
  }
}
