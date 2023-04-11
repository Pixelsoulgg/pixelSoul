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
