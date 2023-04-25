import { Test, TestingModule } from '@nestjs/testing'
import { ChallengeService } from './challenge.service'
import { PrismaService } from '../prisma.service'
import { SteamService } from '../steam/steam.service'
import { GameService } from '../game/game.service'
import { ScoreService } from '../score/score.service'
import { CoinMarketCapService } from '../coin-market-cap/coin-market-cap.service'
import { MoralisService } from '../moralis/moralis.service'
import { OpenseaService } from '../opensea/opensea.service'
describe('ChallengeService', () => {
  let service: ChallengeService
  let prisma

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile()

    service = module.get<ChallengeService>(ChallengeService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
