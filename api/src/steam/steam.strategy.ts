import { Strategy } from 'passport-steam'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { SteamService } from './steam.service'
import { SteamProfile } from './steam.interface'
import * as dotenv from 'dotenv'
dotenv.config()
@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private steamService: SteamService) {
    super(
      {
        returnURL: `${process.env.DOMAIN}/api/v1/steam/auth`,
        realm: `${process.env.DOMAIN}`,
        apiKey: `${process.env.STEAM_API_KEY}`
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
