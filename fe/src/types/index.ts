import { FLIP_TYPE } from "../contracts/types";

export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 56,
}


export interface IWalletInfo {
  bnbBalance: number;
  address: string;
}

export interface IFlipModel {
  type: FLIP_TYPE;
  amount: number;
}

export type Player = {
  player: string;
  bet: number;
  betAmount: number;
  requestId: number;
  result: number;
  transaction_id?: string;
  playAt: number
  isWin: boolean;
}

export interface INftLabel {
  label: string;
  width?: string | number;
  description?: string;
}

export interface INftDashboardItem {
  img: string;
  name: string;
  kb: number;
  amount: number | string;
  floorPrice?: number | string;
  type: string;
}


