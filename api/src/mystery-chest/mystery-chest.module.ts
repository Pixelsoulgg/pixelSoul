import { Module } from '@nestjs/common'
import { MysteryChestService } from './mystery-chest.service'
import { MysteryChestController } from './mystery-chest.controller'
import { PrismaService } from '../prisma.service'
import { ScoreModule } from '../score/score.module'
import { SteamModule } from '../steam/steam.module'

@Module({
  imports: [ScoreModule, SteamModule],
  providers: [MysteryChestService, PrismaService],
  controllers: [MysteryChestController],
  exports: [MysteryChestService]
})
export class MysteryChestModule {}
