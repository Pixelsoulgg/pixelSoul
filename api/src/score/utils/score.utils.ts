// usdt,usdc,DAI
const STABLE_COINS_ETH = [
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  '0x6b175474e89094c44da98b954eedeac495271d0f'
]

// usdt,usdc,DAI
const STABLE_COINS_POLYGON = [
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'
]

// usdt,usdc,DAI
const STABLE_COINS_BSC = [
  '0x55d398326f99059ff775485246999027b3197955',
  '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3'
]

// usdt,usdc,DAI
const STABLE_COINS_AVALANCHE = [
  '0xc7198437980c041c805a1edcba50c1ce5db95118',
  '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
  '0xd586e7f844cea2f87f50152665bcbc2c279d8d70'
]

// usdt,usdc,DAI
const STABLE_COINS_ARBITRUM = [
  '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
  '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1'
]

// usdt,usdc,DAI
const STABLE_COINS_FANTOM = [
  '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
  '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e'
]

//scoring definition

export function getLevel(valueUsd: number): number {
  try {
    if (valueUsd <= 0) {
      return 0
    }
    if (valueUsd >= 1 && valueUsd <= 250) {
      return 1
    }
    if (valueUsd >= 251 && valueUsd <= 1000) {
      return 2
    }
    if (valueUsd >= 1001 && valueUsd <= 4000) {
      return 3
    }
    if (valueUsd >= 4001 && valueUsd <= 10000) {
      return 4
    }
    if (valueUsd >= 10001 && valueUsd <= 25000) {
      return 5
    }
    if (valueUsd >= 25001 && valueUsd <= 50000) {
      return 6
    }
    if (valueUsd >= 50001 && valueUsd <= 100000) {
      return 7
    }
    if (valueUsd >= 100001 && valueUsd <= 250000) {
      return 8
    }
    if (valueUsd >= 250001 && valueUsd <= 500000) {
      return 9
    }
    if (valueUsd >= 500001 && valueUsd <= 1000000) {
      return 10
    }
    if (valueUsd >= 1000001 && valueUsd <= 10000000) {
      return 11
    }
    if (valueUsd >= 10000001) {
      return 12
    }
  } catch (error) {
    console.log('get_level', error)
  }
  return 0
}

export function getSlugBySymbol(slug: string): string {
  try {
    switch (slug) {
      case 'eth':
        return 'ethereum'
      case 'USDT':
        return 'tether'
      case 'USDC':
        return 'usd-coin'
      case 'DAI':
        return 'multi-collateral-dai'
      case 'polygon':
        return 'polygon'
      case 'bsc':
        return 'bnb'
      //fantom
      case 'avalanche':
        return 'avalanche'
      case 'arbitrum':
        return 'ethereum'
      case 'fantom':
        return 'fantom'
      default:
        return ''
        break
    }
  } catch (error) {
    console.log(error)
  }
  return ''
}
export function getStableCoinList(chain: string) {
  switch (chain) {
    case 'eth':
      return STABLE_COINS_ETH
    case 'polygon':
      return STABLE_COINS_POLYGON
    case 'bsc':
      return STABLE_COINS_BSC
    case 'avalanche':
      return STABLE_COINS_AVALANCHE
    case 'arbitrum':
      return STABLE_COINS_ARBITRUM
    case 'fantom':
      return STABLE_COINS_FANTOM
    default:
      return ''
      break
  }
}

export function getChainList() {
  return ['eth', 'polygon', 'bsc', 'avalanche', 'arbitrum', 'fantom']
  //return ['eth'];
}
