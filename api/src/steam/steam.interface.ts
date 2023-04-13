export interface SteamProfile {
  displayName: string
  id: string
  identifier: string
  photos: Image
  provider: string
}

interface Image {
  value: string
}
export interface SteamGeneralData {
  steamId: string
  totalHours: number
  level: number
  timeCreated: Date
  gameNumber: number
  games: OwnedGame[]
  topGenre: OwnedGame[]
  topGame: OwnedGame[]
}
export interface OwnedGame {
  appid: number
  playtime_forever?: number
  playtime_windows_forever?: number
  playtime_mac_forever?: number
  playtime_linux_forever?: number
  rtime_last_played?: number
}

export interface OwnedGameResponse {
  response: {
    game_count: number
    games: OwnedGame[]
  }
}
export interface LevelResponse {
  response: { player_level?: number }
}
export interface TopGenre {
  genre: string
  totalHours: number
}
