import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { COINMARKETCAP_API_KEY } from '../app.settings'
import { Currency } from './coin-market-cap.interface'

@Injectable()
export class CoinMarketCapService {
  async getExchangeRate(slug: string): Promise<Currency | undefined> {
    try {
      const response = await axios(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=${slug}`,
        {
          headers: {
            'Content-type': 'application/json',
            'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY
          }
        }
      )
      const coinid = Object.keys(response.data.data)[0]
      const rs = <Currency>response.data.data[coinid]
      return rs
    } catch (error) {
      console.log(error)
    }
    return undefined
  }
}
