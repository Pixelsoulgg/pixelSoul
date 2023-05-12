import { Test, TestingModule } from '@nestjs/testing'
import { MysteryChestService } from './mystery-chest.service'
import { PrismaService } from '../prisma.service'

describe('MysteryChestService', () => {
  let service: MysteryChestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, MysteryChestService]
    }).compile()

    service = module.get<MysteryChestService>(MysteryChestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
