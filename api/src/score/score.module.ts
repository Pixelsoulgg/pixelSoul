import { Module } from '@nestjs/common'
import { CoinMarketCapService } from 'src/coin-market-cap/coin-market-cap.service'
import { MoralisService } from 'src/moralis/moralis.service'
import { OpenseaService } from 'src/opensea/opensea.service'
import { PrismaService } from 'src/prisma.service'
import { ScoreController } from './score.controller'
import { ScoreService } from './score.service'

@Module({
  controllers: [ScoreController],
  providers: [ScoreService, PrismaService, CoinMarketCapService, MoralisService, OpenseaService]
})
export class ScoreModule {}
