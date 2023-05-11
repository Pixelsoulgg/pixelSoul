import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ChestService } from './chest.service'
@ApiTags('chest')
@Controller({ version: '1', path: 'chest' })
export class ChestController {
  constructor(private chestService: ChestService) {}
  @Get(':auth0Sub')
  async chest(@Param('auth0Sub') auth0Sub: string) {
    return this.chestService.findAll({ where: { auth0Sub } })
  }
}
