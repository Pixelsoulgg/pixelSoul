import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GameModule } from './game/game.module'
import { ScoreModule } from './score/score.module'
import { UserModule } from './user/user.module'
import { NftModule } from './nft/nft.module'
import { SteamModule } from './steam/steam.module'
import { ChallengeModule } from './challenge/challenge.module'
import { ChestModule } from './chest/chest.module'
import { MysteryChestModule } from './mystery-chest/mystery-chest.module'
import { EventModule } from './event/event.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    GameModule,
    ScoreModule,
    UserModule,
    NftModule,
    SteamModule,
    ChallengeModule,
    ChestModule,
    MysteryChestModule,
    EventModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload')
    }),
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
