import { Module } from '@nestjs/common'
import { SteamService } from './steam.service'
import { SteamController } from './steam.controller'
import { SteamStrategy } from './steam.strategy'
import { PassportModule } from '@nestjs/passport'
import { GameService } from 'src/game/game.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [SteamController],
  providers: [SteamService, SteamStrategy, SteamService, GameService, PrismaService],
  imports: [PassportModule]
})
export class SteamModule {}
