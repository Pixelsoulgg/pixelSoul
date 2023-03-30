import { RequestMethod, VersioningType } from '@nestjs/common'
import * as dotenv from 'dotenv'
dotenv.config()
export const MORALIS_API_KEY = process.env.MORALIS_API_KEY || ''
export const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY || ''
export const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ''
export const PORT = process.env.PORT || ''
export function setAppSetting(app) {
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }]
  })
  app.enableVersioning({
    type: VersioningType.URI
  })
}
