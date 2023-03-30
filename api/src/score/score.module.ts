import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ScoreController } from './score.controller'
import { ScoreService } from './score.service'

@Module({
  controllers: [ScoreController],
  providers: [ScoreService, PrismaService]
})
export class ScoreModule {}
