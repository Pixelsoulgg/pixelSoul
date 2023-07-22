import { Test, TestingModule } from '@nestjs/testing'
import { SoultagService } from './soultag.service'

describe('SoultagService', () => {
  let service: SoultagService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoultagService]
    }).compile()

    service = module.get<SoultagService>(SoultagService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
