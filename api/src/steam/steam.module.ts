import { Module } from '@nestjs/common'
import { SteamService } from './steam.service'
import { SteamController } from './steam.controller'
import { SteamStrategy } from './steam.strategy'
import { PassportModule } from '@nestjs/passport'
import { GameService } from '../game/game.service'
import { GameModule } from '../game/game.module'
import { PrismaService } from '../prisma.service'

@Module({
  controllers: [SteamController],
  providers: [SteamService, SteamStrategy, GameService, PrismaService],
  imports: [PassportModule, GameModule],
  exports: [SteamService]
})
export class SteamModule {}
