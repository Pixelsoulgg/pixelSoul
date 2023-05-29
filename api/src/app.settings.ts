import { INestApplication, RequestMethod, VersioningType } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import * as dotenv from 'dotenv'
import { RolesGuard } from './roles/roles.guard'
import { Reflector } from '@nestjs/core'
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
  //app.useGlobalGuards(new (AuthGuard('jwt'))(), new RolesGuard(new Reflector()))
}
