import { Test, TestingModule } from '@nestjs/testing'
import { GameService } from './game.service'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../prisma.service'

describe('UserService', () => {
  let service: GameService
  let prisma

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService, PrismaService]
    }).compile()

    service = module.get<GameService>(GameService)
    prisma = module.get<PrismaClient>(PrismaService)
  })
  afterEach(async () => {
    jest.resetModules()
    await prisma.$disconnect()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
