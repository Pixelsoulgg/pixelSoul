import { Injectable } from '@nestjs/common'
import { OpenseaService } from '../opensea/opensea.service'
import { AssetResponse } from 'src/opensea/opensea.interface'

@Injectable()
export class NftService {
  constructor(private openseaService: OpenseaService) {}
  async assets(ownerAddress: string) {
    const collections = await this.openseaService.getNFTCollections(ownerAddress)
    const assets = await this.openseaService.assets(ownerAddress)
    const mAssets = assets.assets.map((m) => {
      const nAsset = {
        ...m,
        stats: collections.find(
          (f) => f.primary_asset_contracts[0]?.address == m.asset_contract.address
        )?.stats
      }
      return nAsset
    })
    const nAssets: AssetResponse = {
      next: assets.next,
      previous: assets.previous,
      assets: mAssets
    }
    return nAssets
  }
}
