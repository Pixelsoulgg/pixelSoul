import { Controller, Get, Param } from '@nestjs/common'
import { NftService } from './nft.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('nft')
@Controller({ path: 'nft', version: '1' })
export class NftController {
  constructor(private nftService: NftService) {}
  @Get(':address')
  async getAssets(@Param('address') ownerAddress: string) {
    return await this.nftService.assets(ownerAddress)
  }
}
