import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GameModule } from './game/game.module'
import { ScoreModule } from './score/score.module'

@Module({
  imports: [GameModule, ScoreModule],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {}
