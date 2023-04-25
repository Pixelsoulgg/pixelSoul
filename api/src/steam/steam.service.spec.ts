import { Test, TestingModule } from '@nestjs/testing'
import { SteamService } from './steam.service'
import { PrismaService } from '../prisma.service'
import { PrismaClient } from '@prisma/client'
import { GameService } from 'src/game/game.service'

describe('SteamService', () => {
  let service: SteamService
  let prisma

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SteamService, PrismaService, GameService]
    }).compile()

    service = module.get<SteamService>(SteamService)
    prisma = module.get<PrismaClient>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
