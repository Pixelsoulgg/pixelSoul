import { OPENSEA_API_KEY } from '../app.settings'
import { AssetResponse, NTFCollectionGeneral, Stats } from './opensea.interface'
import axios from 'axios'
import { Injectable } from '@nestjs/common'
@Injectable()
export class OpenseaService {
  api_host = `https://api.opensea.io/api/v1`

  axiosOptions = {
    headers: {
      accept: 'application/json',
      'X-API-KEY': OPENSEA_API_KEY
    }
  }

  async getNFTStats(slug: string): Promise<Stats> {
    const url = `${this.api_host}/collection/${slug}/stats`
    const response = await axios.get(url, this.axiosOptions)
    const rs = <Stats>response.data.stats
    return rs
  }

  async getNFTCollections(wallet: string, limit = 300): Promise<NTFCollectionGeneral[]> {
    const url = `${this.api_host}/collections?asset_owner=${wallet}&offset=0&limit=${limit}`

    const response = await axios.get(url, this.axiosOptions)
    const collections = <NTFCollectionGeneral[]>response.data
    return collections
  }

  async assets(wallet: string, limit = 20): Promise<AssetResponse> {
    const url = `${this.api_host}/assets?owner=${wallet}&order_direction=desc&limit=${limit}&include_orders=false`

    const response = await axios.get(url, this.axiosOptions)
    const assets = <AssetResponse>response.data
    return assets
  }
}
