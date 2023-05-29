import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ChallengeService } from './challenge.service'
import { EligibilityDto } from './dto/eligibility.dto'
import { AuthGuard } from '@nestjs/passport'
@ApiTags('challenge')
@Controller({ version: '1', path: 'challenge' })
export class ChallengeController {
  constructor(private challengeService: ChallengeService) {}
  @Get('/:steamId')
  async challenge(@Param('steamId') steamId: string) {
    console.log('steamid', steamId)
    return await this.challengeService.findMany(steamId)
  }
  @ApiBearerAuth('bearer')
  @UseGuards(AuthGuard('jwt'))
  @Patch('/active')
  async active(@Body() eligibilityDto: EligibilityDto) {
    return await this.challengeService.activeChallenge(
      eligibilityDto.challengeId,
      eligibilityDto.steamId
    )
  }
  @ApiBearerAuth('bearer')
  @UseGuards(AuthGuard('jwt'))
  @Post('/check')
  async check(@Body() eligibilityDto: EligibilityDto) {
    return await this.challengeService.checkEligibility(eligibilityDto)
  }
}
