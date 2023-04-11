import { Module } from '@nestjs/common'
import { CoinMarketCapService } from '../coin-market-cap/coin-market-cap.service'
import { MoralisService } from '../moralis/moralis.service'
import { OpenseaService } from '../opensea/opensea.service'
import { PrismaService } from '../prisma.service'
import { ScoreController } from './score.controller'
import { ScoreService } from './score.service'

@Module({
  controllers: [ScoreController],
  providers: [ScoreService, PrismaService, CoinMarketCapService, MoralisService, OpenseaService]
})
export class ScoreModule {}
