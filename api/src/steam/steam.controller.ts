import { Controller, Get, Injectable, Param, Request, UseGuards } from '@nestjs/common'
import { SteamService } from './steam.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('steam')
@Controller({ version: '1', path: 'steam' })
@Injectable()
export class SteamController {
  constructor(private steamService: SteamService) {}
  @Get('auth')
  @UseGuards(AuthGuard('steam'))
  async login(@Request() req: any) {
    return req.user
  }
  @Get('playerSummaries/:steamId')
  async summaries(@Param('steamId') steamId: string) {
    return this.steamService.playerSummaries(steamId)
  }
  @Get('playerLevel/:steamId')
  async level(@Param('steamId') steamId: string) {
    return this.steamService.playerLevel(steamId)
  }
  @Get('playerBadges/:steamId')
  async badges(@Param('steamId') steamId: string) {
    return this.steamService.playerBadges(steamId)
  }
  @Get('playerAchievements/:steamId/:appId')
  async achievements(@Param('steamId') steamId: string, @Param('appId') appId: string) {
    return this.steamService.playerAchievements(steamId, appId)
  }
  @Get('recentlyPlayedGames/:steamId')
  async recentlyPlayedGames(@Param('steamId') steamId: string) {
    return this.steamService.recentlyPlayedGames(steamId)
  }
  @Get('userStatsForGame/:steamId/:appId')
  async userStatsForGame(@Param('steamId') steamId: string, @Param('appId') appId: string) {
    return this.steamService.userStatsForGame(steamId, appId)
  }
  @Get('ownedGames/:steamId')
  async ownedGames(@Param('steamId') steamId: string) {
    return this.steamService.ownedGames(steamId)
  }
}
