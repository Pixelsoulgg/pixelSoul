import { Module } from '@nestjs/common'
import { ChallengeController } from './challenge.controller'
import { PrismaService } from 'src/prisma.service'
import { ChallengeService } from './challenge.service'
import { SteamService } from 'src/steam/steam.service'
import { GameService } from 'src/game/game.service'
import { ScoreService } from 'src/score/score.service'
import { CoinMarketCapService } from 'src/coin-market-cap/coin-market-cap.service'
import { MoralisService } from 'src/moralis/moralis.service'
import { OpenseaService } from 'src/opensea/opensea.service'

@Module({
  controllers: [ChallengeController],
  providers: [
    ChallengeService,
    PrismaService,
    SteamService,
    GameService,
    ScoreService,
    CoinMarketCapService,
    MoralisService,
    OpenseaService
  ]
})
export class ChallengeModule {}
