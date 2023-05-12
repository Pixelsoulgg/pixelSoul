import { Module } from '@nestjs/common'
import { MysteryChestService } from './mystery-chest.service'
import { MysteryChestController } from './mystery-chest.controller'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [MysteryChestService, PrismaService],
  controllers: [MysteryChestController]
})
export class MysteryChestModule {}
