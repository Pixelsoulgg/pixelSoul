import { Test, TestingModule } from '@nestjs/testing'
import { ChestService } from './chest.service'
import { PrismaService } from '../prisma.service'

describe('ChestService', () => {
  let service: ChestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChestService, PrismaService]
    }).compile()

    service = module.get<ChestService>(ChestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
