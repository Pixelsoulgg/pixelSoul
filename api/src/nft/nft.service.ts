import { Injectable } from '@nestjs/common'
import { OpenseaService } from '../opensea/opensea.service'

@Injectable()
export class NftService {
  constructor(private openseaService: OpenseaService) {}
  async assets(ownerAddress: string) {
    return this.openseaService.assets(ownerAddress)
  }
}
