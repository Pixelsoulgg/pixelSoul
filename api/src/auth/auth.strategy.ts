import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AUTH0_AUDIENCE, AUTH0_ISSUER_URL } from 'src/app.settings'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 1,
        jwksUri: `${AUTH0_ISSUER_URL}.well-known/jwks.json`
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: AUTH0_AUDIENCE,
      issuer: AUTH0_ISSUER_URL,
      algorithms: ['RS256']
    })
  }

  async validate(payload: any) {
    console.log(payload)

    return { auth0Sub: payload.sub }
  }
}
