import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { buildUrl } from './steam.utils'
import { STEAM_API_HOST, STEAM_API_KEY } from 'src/app.settings'
import axios from 'axios'
import { GameService } from 'src/game/game.service'
import { SteamGeneralData, OwnedGame, OwnedGameResponse, topGenre } from './steam.interface'
import { ScoreService } from 'src/score/score.service'

@Injectable()
export class SteamService {
  constructor(private gameService: GameService, private scoreService: ScoreService) {}
  async playerSummaries(steamId: string) {
    const url = buildUrl(
      STEAM_API_HOST,
      `ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`
    )
    const data = (await axios.get(url))?.data
    return data
  }
  async playerAchievements(steamId: string, appId: string) {
    try {
      const url = buildUrl(
        STEAM_API_HOST,
        `ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${STEAM_API_KEY}&steamid=${steamId}`
      )
      const data = (await axios.get(url))?.data
      return data
    } catch (error) {
      console.log(error)
      return undefined
    }
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
      `IPlayerService/GetOwnedGames/v1?key=${STEAM_API_KEY}&steamid=${steamId}&include_appinfo=1`
    )
    const data: OwnedGameResponse = (await axios.get(url))?.data
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
    let sGames: OwnedGame[] = []
    let steamProfile: any

    const games = await this.gameService.findAll({})
    const ownedGames = (await this.ownedGames(steamId)).response
    if (!ownedGames?.game_count || ownedGames?.game_count < 1) {
      const msg = `Id [${steamId}] don't has any game`
      throw new HttpException(msg, HttpStatus.NOT_FOUND)
    }

    // games.forEach((g) => {
    //   const sGame = ownedGames.games.find((f) => f.appid == g.appId)
    //   if (sGame) {
    //     totalHours += sGame.playtime_forever | 0
    //     sGames.push(sGame)
    //   }
    // })
    sGames = <OwnedGame[]>ownedGames.games
    if (ownedGames.games.length < 1) {
      const msg = `Id [${steamId}] don't has any support game`
      throw new HttpException(msg, HttpStatus.NOT_FOUND)
    }

    steamLevel = (await this.playerLevel(steamId)).response.player_level
    const user = await this.playerSummaries(steamId)
    if (user?.response?.players.length > 0) {
      timeCreated = user?.response?.players[0].timecreated
      steamProfile = user?.response?.players[0]
    }
    const topGame = sGames.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 3)

    const tmpTopGenre = {}
    let point = sGames.length * 3
    await Promise.all(
      sGames.map(async (g) => {
        const game = games.find((f) => f.appId == g.appid)

        totalHours += (g.playtime_forever | 0) / 60
        point += (g.playtime_forever | 0) / 60 / 10
        if (game) {
          const genre = game?.gameTypes?.name
          tmpTopGenre[genre] = tmpTopGenre[genre] || 0
          tmpTopGenre[genre] += (g.playtime_forever || 0) / 60
          const achievements = await this.playerAchievements(steamId, g.appid.toString())
          achievements?.playerstats?.achievements?.forEach((a: any) => {
            if (a.unlocktime > 0) point += 1
          })
        }

        return g
      })
    )
    const Genres: topGenre[] = []
    Object.keys(tmpTopGenre).forEach((f) => {
      const genre: topGenre = {
        genre: f,
        hours: tmpTopGenre[f]
      }
      Genres.push(genre)
    })
    const topGenre = Genres.sort((a, b) => b.hours - a.hours).slice(0, 3)
    //if (topGame.length > 0) point += topGame[0].playtime_forever * 0.05
    //if (steamLevel > 0) point += steamLevel * 100
    // const badges = await this.playerBadges(steamId)
    // if (badges.response?.badges?.length > 0) point += badges.response?.badges.length * 100

    const generalData: SteamGeneralData = {
      steamId,
      totalHours,
      level: steamLevel,
      timeCreated,
      point,
      steamProfile,
      gameNumber: sGames.length,
      topGenre,
      topGame,
      games: sGames
    }
    return generalData
  }
}
//76561197960434622
