import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AUTH0_AUDIENCE, AUTH0_ISSUER_URL } from '../app.settings'
import { PrismaService } from '../prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
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
    const userRoles = await this.prismaService.grantRole.findMany({
      where: { auth0Sub: payload.sub },
      include: { role: true }
    })
    const roles: string[] = []
    if (userRoles.length > 0) {
      roles.push(...userRoles.map((m) => m.role.name))
    }
    return { auth0Sub: payload.sub, roles }
  }
}
