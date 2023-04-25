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

@Module({
  imports: [GameModule, ScoreModule, UserModule, NftModule, SteamModule, ChallengeModule],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {}
