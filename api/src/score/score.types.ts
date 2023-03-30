export interface StableCoinsHolding {
  name: string
  symbol: string
  tokenAddress: string
  totalUsd: number
}
export interface Native {
  balance: number
  value: number
}
export interface TokenHolding {
  chain: string
  native: Native
  stableCoins: StableCoinsHolding[]
  totalHolding: number
}
export interface NFT {
  slug: string
  amount: number
  totalETH: number
  totalUSD: number
  floorPriceETH: number
  ethPrice: number
  priceInUSD: number
}
export interface NFTHolding {
  nfts: (NFT | undefined)[]
  totalNftsAmount: number
  totalNftsInUsd: number
}
export interface ScoreData {
  tokenHolding: (TokenHolding | undefined)[]
  nftHolding: NFTHolding | undefined
  totalCoinsAllChain: number
  totalNFTsAllChain: number
  investorLevel: number
  collectorLevel: number
}
