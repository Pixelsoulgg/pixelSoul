import { Module } from '@nestjs/common'
import { ChestService } from './chest.service'
import { PrismaService } from '../prisma.service'
import { ChestController } from './chest.controller'

@Module({
  controllers: [ChestController],
  providers: [ChestService, PrismaService],
  exports: [ChestService]
})
export class ChestModule {}
