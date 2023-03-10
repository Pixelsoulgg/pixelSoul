export interface Quote {
    USD: {
        price: number;
        volume_24h: number;
        volume_change_24h: number;
        percent_change_1h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        market_cap: number;
        market_cap_dominance: number;
        fully_diluted_market_cap: number;
        last_updated: string;
    };
}

export interface Currency {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    is_active: number;
    is_fiat: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    date_added: string;
    num_market_pairs: number;
    cmc_rank: number;
    last_updated: string;
    tags: string[];
    platform: any;
    self_reported_circulating_supply: any;
    self_reported_market_cap: any;
    quote: Quote;
}

export interface Status {
    timestamp: string;
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
}

export interface CoinData {
    data: {
        [key: string]: Currency;
    };
    status: Status;
}
