import { Injectable } from '@nestjs/common'
import { buildUrl } from './steam.utils'
import { STEAM_API_HOST, STEAM_API_KEY } from 'src/app.settings'
import axios from 'axios'
import { GameService } from 'src/game/game.service'
import { SteamGeneralData, OwnedGame, OwnedGameResponse } from './steam.interface'
import { UserService } from 'src/user/user.service'

@Injectable()
export class SteamService {
  constructor(private gameService: GameService, private userService: UserService) {}
  async playerSummaries(steamId: string) {
    const url = buildUrl(
      STEAM_API_HOST,
      `ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`
    )
    const data = (await axios.get(url))?.data
    return data
  }
  async playerAchievements(steamId: string, appId: string) {
    const url = buildUrl(
      STEAM_API_HOST,
      `ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${STEAM_API_KEY}&steamid=${steamId}`
    )
    const data = (await axios.get(url))?.data
    return data
  }
  async userStatsForGame(steamId: string, appId: string) {
    const url = buildUrl(
      STEAM_API_HOST,
      `ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${STEAM_API_KEY}&steamid=${steamId}`
    )
    const data = (await axios.get(url))?.data
    return data
  }
  async ownedGames(steamId: string): Promise<OwnedGameResponse> {
    const url = buildUrl(
      STEAM_API_HOST,
      `IPlayerService/GetOwnedGames/v0001?key=${STEAM_API_KEY}&steamid=${steamId}`
    )
    const data: OwnedGameResponse = JSON.parse((await axios.get(url))?.data)
    return data
  }
  async recentlyPlayedGames(steamId: string) {
    const url = buildUrl(
      STEAM_API_HOST,
      `IPlayerService/GetRecentlyPlayedGames/v0001?key=${STEAM_API_KEY}&steamid=${steamId}`
    )
    const data = (await axios.get(url))?.data
    return data
  }

  ///IPlayerService/GetSteamLevel/v1/GetBadges
  async playerLevel(steamId: string) {
    const url = buildUrl(
      STEAM_API_HOST,
      `IPlayerService/GetSteamLevel/v1?key=${STEAM_API_KEY}&steamid=${steamId}`
    )
    const data = (await axios.get(url))?.data
    return data
  }
  async playerBadges(steamId: string) {
    const url = buildUrl(
      STEAM_API_HOST,
      `IPlayerService/GetBadges/v1?key=${STEAM_API_KEY}&steamid=${steamId}`
    )
    const data = (await axios.get(url))?.data
    return data
  }
  async general(steamId: string) {
    let totalHours = 0
    let timeCreated: Date
    let steamLevel = 0
    let sGames: OwnedGame[]
    let topGenre: OwnedGame[]

    const games = await this.gameService.findAll({})
    const ownedGames = (await this.ownedGames(steamId)).response
    games.forEach((g) => {
      const sGame = ownedGames.games.find((f) => f.appid == g.appId)
      if (sGame) {
        totalHours += sGame.playtime_forever | 0
        sGames.push(sGame)
      }
    })
    steamLevel = (await this.playerLevel(steamId)).response.player_level
    const user = await this.userService.findOne({ steamId })
    if (user) timeCreated = user.steamTimeCreated
    const topGame = sGames.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 2)
    // const group = sGames.reduce((g, c) => {
    //   const {}=g
    //   g[genre]=
    // })
    const generalData: SteamGeneralData = {
      steamId,
      totalHours,
      level: steamLevel,
      timeCreated,
      gameNumber: sGames.length,
      games: sGames,
      topGenre,
      topGame
    }
    return generalData
  }
}
