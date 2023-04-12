import { Injectable } from '@nestjs/common'
import { buildUrl } from './steam.utils'
import { STEAM_API_HOST, STEAM_API_KEY } from 'src/app.settings'
import axios from 'axios'

@Injectable()
export class SteamService {
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
  async ownedGames(steamId: string) {
    const url = buildUrl(
      STEAM_API_HOST,
      `IPlayerService/GetOwnedGames/v0001?key=${STEAM_API_KEY}&steamid=${steamId}`
    )
    const data = (await axios.get(url))?.data
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
}
