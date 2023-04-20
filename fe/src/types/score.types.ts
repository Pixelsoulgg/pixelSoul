interface TokenHolding {
  chain: string;
  native: {
    balance: string;
    value: number;
  };
  stableCoins: {
    name: string;
    symbol: string;
    tokenAddress: string;
    totalUsd: number;
  }[];
  totalHolding: number;
}

interface Nft {
  slug: string;
  amount: number;
  totalETH: number;
  totalUSD: number;
  floorPriceETH: number;
  ethPrice: number;
  priceInUSD: number;
}

interface NftHolding {
  totalNftsAmount: number;
  totalNftsInUsd: number;
  nfts: Nft[];
  nftPoint: number;
}

export interface IScore {
  tokenHolding: TokenHolding[];
  nftHolding: NftHolding;
  totalCoinsAllChain: number;
  totalNFTsAllChain: number;
  investorLevel: number;
  collectorLevel: number;
}
