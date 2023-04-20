import { Module } from '@nestjs/common'
import { NftController } from './nft.controller'
import { NftService } from './nft.service'
import { OpenseaService } from '../opensea/opensea.service'

@Module({
  providers: [NftService, OpenseaService],
  controllers: [NftController]
})
export class NftModule {}
