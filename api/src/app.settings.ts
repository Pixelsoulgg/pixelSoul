import { INestApplication, RequestMethod, VersioningType } from '@nestjs/common'
import * as dotenv from 'dotenv'
dotenv.config()
export const MORALIS_API_KEY = process.env.MORALIS_API_KEY || ''
export const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY || ''
export const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ''
export const PORT = process.env.PORT || ''
export const DOMAIN = process.env.DOMAIN || ''
export const STEAM_API_KEY = process.env.STEAM_API_KEY || ''
export const STEAM_API_HOST = process.env.STEAM_API_HOST || ''
export const AUTH0_ISSUER_URL = process.env.AUTH0_ISSUER_URL || ''
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || ''
export const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID || ''
export const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET || ''
export const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN || ''
export const GOOGLE_EMAIL_ADDRESS = process.env.GOOGLE_EMAIL_ADDRESS || ''
export const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL || ''

export function setAppSetting(app: INestApplication) {
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }]
  })
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3004', /\.pixelsoul.gg$/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
}
