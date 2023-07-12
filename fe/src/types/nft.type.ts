export interface NFT {
  id: number;
  token_id: string;
  num_sales: number;
  background_color: null | string;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  animation_url: null | string;
  animation_original_url: null | string;
  name: string;
  description: string;
  external_link: null | string;
  asset_contract: {
    address: string;
    asset_contract_type: string;
    chain_identifier: string;
    created_date: string;
    name: string;
    nft_version: null | string;
    opensea_version: null | string;
    owner: number;
    schema_name: string;
    symbol: string;
    total_supply: string;
    description: string;
    external_link: string;
    image_url: string;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address: string;
  };
  permalink: string;
  collection: {
    banner_image_url: string;
    chat_url: null | string;
    created_date: string;
    default_to_fiat: boolean;
    description: string;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url: null | string;
    display_data: {
      card_display_style: string;
    };
    external_url: string;
    featured: boolean;
    featured_image_url: string;
    hidden: boolean;
    safelist_request_status: string;
    image_url: string;
    is_subject_to_whitelist: boolean;
    large_image_url: string;
    medium_username: null | string;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: number;
    payout_address: string;
    require_email: boolean;
    short_description: null | string;
    slug: string;
    telegram_url: null | string;
  };
  stats: {
    one_minute_volume: number;
    one_minute_change: number;
    one_minute_sales: number;
    one_minute_sales_change: number;
    one_minute_average_price: number;
    one_minute_difference: number;
    five_minute_volume: number;
    five_minute_change: number;
    five_minute_sales: number;
    five_minute_sales_change: number;
    five_minute_average_price: number;
    five_minute_difference: number;
    fifteen_minute_volume: number;
    fifteen_minute_change: number;
    fifteen_minute_sales: number;
    fifteen_minute_sales_change: number;
    fifteen_minute_average_price: number;
    fifteen_minute_difference: number;
    thirty_minute_volume: number;
    thirty_minute_change: number;
    thirty_minute_sales: number;
    thirty_minute_sales_change: number;
    thirty_minute_average_price: number;
    thirty_minute_difference: number;
    one_hour_volume: number;
    one_hour_change: number;
    one_hour_sales: number;
    one_hour_sales_change: number;
    one_hour_average_price: number;
    one_hour_difference: number;
    six_hour_volume: number;
    six_hour_change: number;
    six_hour_sales: number;
    six_hour_sales_change: number;
    six_hour_average_price: number;
    six_hour_difference: number;
    one_day_volume: number;
    one_day_change: number;
    one_day_sales: number;
    one_day_sales_change: number;
    one_day_average_price: number;
    one_day_difference: number;
    seven_day_volume: number;
    seven_day_change: number;
    seven_day_sales: number;
    seven_day_average_price: number;
    seven_day_difference: number;
    thirty_day_volume: number;
    thirty_day_change: number;
    thirty_day_sales: number;
    thirty_day_average_price: number;
    thirty_day_difference: number;
    total_volume: number;
    total_sales: number;
    total_supply: number;
    count: number;
    num_owners: number;
    average_price: number;
    num_reports: number;
    market_cap: number;
    floor_price: number;
  }
}

export interface NFTResponse {
  next?: string;
  previous?: string;
  assets: NFT[];
}

export interface ISuiNftItem {
  objectId: string;
  type: string;
  body: string;
  gun: string;
  head: string;
  leg: string;
  level: number;
  name: string;
  sword: string;
  image: string;
}

export interface IFirebaseLeaderBoard {
  extra: number;
  name: string;
  score: number;
  updateAt: {
    TIMESTAMP: number;
  };
}