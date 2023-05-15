import { Module } from '@nestjs/common'
import { SteamService } from './steam.service'
import { SteamController } from './steam.controller'
import { SteamStrategy } from './steam.strategy'
import { PassportModule } from '@nestjs/passport'
import { GameService } from '../game/game.service'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { ScoreService } from '../score/score.service'
import { CoinMarketCapService } from '../coin-market-cap/coin-market-cap.service'
import { MoralisService } from '../moralis/moralis.service'
import { OpenseaService } from '../opensea/opensea.service'

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
  imports: [PassportModule],
  exports: [SteamService]
})
export class SteamModule {}
