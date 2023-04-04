import { Controller, Get, Injectable, Param } from '@nestjs/common'
import { ScoreService } from './score.service'
import { ScoreData } from './score.interface'
@Controller({
  version: '1',
  path: 'score'
})
@Injectable()
export class ScoreController {
  constructor(private scoreService: ScoreService) {}
  @Get(':address')
  public async getScore(@Param('address') address: string): Promise<ScoreData | undefined> {
    return this.scoreService.getScore(address)
  }
}
