
export interface StableCoinsHolding {
    name: string;
    symbol: string;
    tokenAddress: string;
    totalUsd: number;
}
export interface Native {
    balance: number,
    value: number
}
export interface TokenHolding {
    chain: string,
    native: Native,
    stableCoins: StableCoinsHolding[],
    totalHolding: number
}
export interface NFT {
    slug: string,
    amount: number,
    totalETH: number,
    totalUSD: number
}
export interface NFTHolding {
    nfts: (NFT | undefined)[],
    totalNftsAmount: number,
    totalNftsInUsd: number
}
export interface ScoreData {
    tokenHolding: (TokenHolding | undefined)[],
    nftHolding: NFTHolding | undefined,
    totalAllChain: number,
    totalAllChainNfts: number,
    investorLevel: number,
    collectorLevel: number
}