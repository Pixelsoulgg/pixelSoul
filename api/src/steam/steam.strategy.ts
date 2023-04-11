import { Strategy } from 'passport-steam'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { SteamService } from './steam.service'
import { SteamProfile } from './steam.interface'
import { DOMAIN, STEAM_API_KEY } from '../app.settings'
@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private steamService: SteamService) {
    super(
      {
        returnURL: `${DOMAIN}/api/v1/steam/auth`,
        realm: `${DOMAIN}`,
        apiKey: `${STEAM_API_KEY}`
      },
      (
        _: string,
        profile: SteamProfile,
        done: (a: null | string, b: SteamProfile) => typeof done
      ) => {
        return done(null, profile)
      }
    )
  }

  async validate(identifier: any, profile: any, done: any): Promise<any> {
    console.log('infor', identifier, profile, done)
    return 'success'
  }
}
