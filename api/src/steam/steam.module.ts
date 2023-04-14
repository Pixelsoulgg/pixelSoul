import { Module } from '@nestjs/common'
import { SteamService } from './steam.service'
import { SteamController } from './steam.controller'
import { SteamStrategy } from './steam.strategy'
import { PassportModule } from '@nestjs/passport'
import { GameService } from 'src/game/game.service'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Module({
  controllers: [SteamController],
  providers: [SteamService, SteamStrategy, GameService, PrismaService, UserService],
  imports: [PassportModule]
})
export class SteamModule {}
