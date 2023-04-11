import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GameModule } from './game/game.module'
import { ScoreModule } from './score/score.module'
import { UserModule } from './user/user.module'
import { SteamModule } from './steam/steam.module'

@Module({
  imports: [GameModule, ScoreModule, UserModule, SteamModule],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {}
