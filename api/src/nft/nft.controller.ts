import { Controller, Get, Param } from '@nestjs/common'
import { NftService } from './nft.service'

@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {}
  @Get(':address')
  async getAssets(@Param('address') ownerAddress: string) {
    return await this.nftService.assets(ownerAddress)
  }
}
