import { Test, TestingModule } from '@nestjs/testing'
import { NftService } from './nft.service'
import { OpenseaService } from '../opensea/opensea.service'

describe('NftService', () => {
  let service: NftService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftService, OpenseaService]
    }).compile()

    service = module.get<NftService>(NftService)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
