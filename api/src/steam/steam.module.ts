import { Module } from '@nestjs/common'
import { SteamService } from './steam.service'
import { SteamController } from './steam.controller'
import { SteamStrategy } from './steam.strategy'
import { PassportModule } from '@nestjs/passport'
import { GameService } from 'src/game/game.service'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { ScoreModule } from 'src/score/score.module'
import { ScoreService } from 'src/score/score.service'
import { CoinMarketCapService } from 'src/coin-market-cap/coin-market-cap.service'
import { MoralisService } from 'src/moralis/moralis.service'
import { OpenseaService } from 'src/opensea/opensea.service'

@Module({
  controllers: [SteamController],
  providers: [
    SteamService,
    SteamStrategy,
    GameService,
    PrismaService,
    UserService,
    ScoreService,
    CoinMarketCapService,
    MoralisService,
    OpenseaService
  ],
  imports: [PassportModule]
})
export class SteamModule {}
