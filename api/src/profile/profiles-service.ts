import { getExchangeRate } from '../coin-market-cap/service'
import { getNativeBalance, getAllBalances } from '../moralis/service'
import { TokenBalance } from '../moralis/types'
import { getNFTCollections, getNFTStats } from '../opensea/service'
import { NTFCollection, NTFCollectionGeneral, Stats } from '../opensea/types'
import { NFT, NFTHolding, ScoreData, StableCoinsHolding, TokenHolding } from './types'
import { getStableCoinList, getSlugBySymbol, getLevel, getChainList } from './utils'

export class ProfileService {
  callAPINativeBalance = async (wallet: string, chain: string): Promise<number> => {
    try {
      const result = await getNativeBalance(wallet, chain)
      return result
    } catch (er: any) {
      if (er.response?.status === 429) {
        return await this.callAPINativeBalance(wallet, chain)
      }
      if (er == 'Error: read ECONNRESET') {
        return await this.callAPINativeBalance(wallet, chain)
      }
      console.log(er)
    }
    return 0
  }

  callAPIGetBalances = async (wallet: string, chain: string): Promise<TokenBalance[]> => {
    try {
      const result = await getAllBalances(wallet, chain)
      const stableCoins = getStableCoinList(chain)
      console.log(stableCoins, 'statble coins:', chain)
      const rsfilter = result.filter((f) => stableCoins.includes(f.address))
      return rsfilter
    } catch (er: any) {
      if (er.response?.status === 429) {
        return await this.callAPIGetBalances(wallet, chain)
      }
      if (er == 'Error: read ECONNRESET') {
        return await this.callAPIGetBalances(wallet, chain)
      }
      console.log(er)
    }
    return []
  }

  callAPIGetNFTs = async (wallet: string): Promise<NTFCollectionGeneral[]> => {
    try {
      const nfts = await getNFTCollections(wallet)
      return nfts
    } catch (er: any) {
      if (er.response?.status === 429) {
        return await this.callAPIGetNFTs(wallet)
      }
      if (er == 'Error: read ECONNRESET') {
        return await this.callAPIGetNFTs(wallet)
      }
      console.log(er)
    }
    return []
  }
  callAPIGetNFTStats = async (slug: string): Promise<Stats | undefined> => {
    try {
      const nftStats = await getNFTStats(slug)
      return nftStats
    } catch (er: any) {
      if (er.response?.status === 429) {
        return await this.callAPIGetNFTStats(slug)
      }
      if (er == 'Error: read ECONNRESET') {
        return await this.callAPIGetNFTStats(slug)
      }
      console.log(er)
    }
    return undefined
  }

  getTotalHolding = async (
    wallet: string,
    chain_symbol: string
  ): Promise<TokenHolding | undefined> => {
    try {
      // eth
      const nativeSlug = getSlugBySymbol(chain_symbol)
      const nativePrice = await getExchangeRate(nativeSlug)

      const nativeBalance = await getNativeBalance(wallet, chain_symbol)
      const nativeTotal = (nativeBalance * (nativePrice?.quote?.USD?.price || 0)) / 10 ** 18
      // statble coin
      const stableBalance = await this.callAPIGetBalances(wallet, chain_symbol)
      let totalStableCoinValue = 0
      const stableValues = await Promise.all(
        stableBalance.map(async (b) => {
          const slug = getSlugBySymbol(b.symbol.split('.')[0])
          const price = await getExchangeRate(slug)
          const total = (b.balance * (price?.quote.USD.price || 0)) / 10 ** b.decimals
          totalStableCoinValue += total
          const stableCoins: StableCoinsHolding = {
            name: b.name,
            symbol: b.symbol,
            tokenAddress: b.address,
            totalUsd: total
          }
          return stableCoins
        })
      )

      const totalHoldingValue = nativeTotal + totalStableCoinValue
      const finalResult: TokenHolding = {
        chain: chain_symbol,
        native: {
          balance: nativeBalance,
          value: nativeTotal
        },
        stableCoins: stableValues.filter((f) => f),
        totalHolding: totalHoldingValue
      }
      console.log(finalResult)
      return finalResult
    } catch (error) {
      console.log(error)
    }
    return undefined
  }

  getTotalNft = async (wallet: string): Promise<NFTHolding | undefined> => {
    try {
      // nft holding
      const nfts = await this.callAPIGetNFTs(wallet)
      const ethPrice = await getExchangeRate('ethereum')
      let totalNftsAmount = 0
      let totalNftsInUsd = 0

      const price = ethPrice?.quote.USD.price || 0
      const nftsValue = await Promise.all(
        nfts.map(async (nft) => {
          if (nft.stats.total_volume < 30) return
          let totalETH = 0 // floor_price in ETH
          let totalUSD = 0 // floor_price in USD
          let floorPriceETH = 0
          let priceInUSD = 0
          const amount = nft.owned_asset_count || 0
          const stats = await this.callAPIGetNFTStats(nft.slug)

          if (stats) {
            if (stats?.floor_price > 100) return
            floorPriceETH = stats.floor_price
            totalETH = amount * floorPriceETH // floor_price in ETH
            totalUSD = totalETH * price // floor_price in USD
            priceInUSD = floorPriceETH * price
            totalNftsAmount += amount
            totalNftsInUsd += totalUSD
          }
          const ntfData: NFT = {
            slug: nft.slug,
            amount,
            totalETH,
            totalUSD,
            floorPriceETH,
            ethPrice: price,
            priceInUSD
          }
          return ntfData
        })
      )
      const nftData: NFTHolding = {
        totalNftsAmount: totalNftsAmount,
        totalNftsInUsd: totalNftsInUsd,
        nfts: nftsValue.filter((f) => f).length > 0 ? nftsValue.filter((f) => f) : []
      }
      console.log(nftData)
      return nftData
    } catch (error) {
      console.log('get_total_nft', error)
    }
    return undefined
  }

  getScore = async (wallet: string) => {
    try {
      const chains = getChainList()
      let totalAllChain = 0
      let totalAllChainNfts = 0
      const result = await Promise.all(
        chains.map(async (chain) => {
          const data = await this.getTotalHolding(wallet, chain)
          totalAllChain += data?.totalHolding || 0
          return data
        })
      )
      const nft = await this.getTotalNft(wallet)
      totalAllChain += nft?.totalNftsInUsd || 0
      totalAllChainNfts = nft?.totalNftsInUsd || 0
      const investorLevel = getLevel(totalAllChain)
      const collectorLevel = getLevel(totalAllChainNfts)
      const data: ScoreData = {
        tokenHolding: result,
        nftHolding: nft,
        totalCoinsAllChain: totalAllChain,
        totalNFTsAllChain: totalAllChainNfts,
        investorLevel: investorLevel,
        collectorLevel: collectorLevel
      }

      console.log(data)
      return data
    } catch (error) {
      console.log('get_score', error)
    }
  }
}
//get_score('0xdAC17F958D2ee523a2206206994597C13D831ec7');
