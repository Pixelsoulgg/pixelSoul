export interface Stats {
  one_hour_volume: number
  one_hour_change: number
  one_hour_sales: number
  one_hour_sales_change: number
  one_hour_average_price: number
  one_hour_difference: number
  six_hour_volume: number
  six_hour_change: number
  six_hour_sales: number
  six_hour_sales_change: number
  six_hour_average_price: number
  six_hour_difference: number
  one_day_volume: number
  one_day_change: number
  one_day_sales: number
  one_day_sales_change: number
  one_day_average_price: number
  one_day_difference: number
  seven_day_volume: number
  seven_day_change: number
  seven_day_sales: number
  seven_day_average_price: number
  seven_day_difference: number
  thirty_day_volume: number
  thirty_day_change: number
  thirty_day_sales: number
  thirty_day_average_price: number
  thirty_day_difference: number
  total_volume: number
  total_sales: number
  total_supply: number
  count: number
  num_owners: number
  average_price: number
  num_reports: number
  market_cap: number
  floor_price: number
}

export interface DisplayData {
  card_display_style: string
  images: any // You may want to create another interface for images
}

export interface SellerFees {
  [key: string]: number
}

export interface OpenseaFees {
  [key: string]: number
}

export interface Fees {
  seller_fees: SellerFees
  opensea_fees: OpenseaFees
}

export interface NTFCollectionGeneral {
  primary_asset_contracts: any[] // You may want to create another interface for primary_asset_contracts
  traits: { [key: string]: any } // You may want to create another interface for traits
  stats: Stats
  banner_image_url: string | null
  chat_url: string | null
  created_date: string
  default_to_fiat: boolean
  description: string
  dev_buyer_fee_basis_points: string
  dev_seller_fee_basis_points: string
  discord_url: string | null
  display_data: DisplayData
  external_url: string | null
  featured: boolean
  featured_image_url: string
  hidden: boolean
  safelist_request_status: string
  image_url: string
  is_subject_to_whitelist: boolean
  large_image_url: string
  medium_username: string | null
  name: string
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: string
  opensea_seller_fee_basis_points: number
  payout_address: string | null
  require_email: boolean
  short_description: string | null
  slug: string
  telegram_url: string | null
  twitter_username: string | null
  instagram_username: string | null
  wiki_url: string | null
  is_nsfw: boolean
  fees: Fees
  is_rarity_enabled: boolean
  is_creator_fees_enforced: boolean
  owned_asset_count: number | undefined
}

interface AssetContract {
  address: string
  asset_contract_type: string
  created_date: string
  name: string
  nft_version: string | null
  opensea_version: string | null
  owner: number
  schema_name: string
  symbol: string
  total_supply: string
  description: string
  external_link: string
  image_url: string
  default_to_fiat: boolean
  dev_buyer_fee_basis_points: number
  dev_seller_fee_basis_points: number
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: number
  opensea_seller_fee_basis_points: number
  buyer_fee_basis_points: number
  seller_fee_basis_points: number
  payout_address: string
}

interface Trait {
  [traitName: string]: {
    [traitValue: string]: number
  }
}

export interface NTFCollection {
  primary_asset_contracts: AssetContract[]
  traits: Trait
}
