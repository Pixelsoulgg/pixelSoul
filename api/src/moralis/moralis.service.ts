import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { MORALIS_API_KEY } from '../app.settings'
import { TokenBalance } from './moralis.interface'
@Injectable()
export class MoralisService {
  api_host = `https://deep-index.moralis.io/api/v2/`

  axiosOptions = {
    headers: {
      accept: 'application/json',
      'X-API-Key': MORALIS_API_KEY
    }
  }

  async getNativeBalance(address: string, chainId: string): Promise<number> {
    const url = `${this.api_host}${address}/balance?chain=${chainId}`
    console.log(url)
    const response = await axios.get(url, this.axiosOptions)
    const result: number = response.data.balance
    return result
  }
  async getAllBalances(address: string, chainId: string): Promise<TokenBalance[]> {
    const url = `${this.api_host}${address}/erc20?chain=${chainId}`
    const response = await axios.get(url, this.axiosOptions)
    const result: TokenBalance[] = response.data.map((t: any) => {
      const tokenBalance: TokenBalance = {
        address: t.token_address,
        name: t.name,
        symbol: t.symbol,
        balance: t.balance,
        decimals: t.decimals
      }
      return tokenBalance
    })

    return result
  }
}
