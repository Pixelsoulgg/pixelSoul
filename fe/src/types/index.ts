import { UserProfile } from "@auth0/nextjs-auth0/client";
import { FLIP_TYPE } from "../contracts/types";

export interface IDropdownItem {
  lable: string;
  value: string | number;
}

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
  playAt: number;
  isWin: boolean;
};

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

export interface OpenIDData {
  "openid.assoc_handle": string;
  "openid.claimed_id": string;
  "openid.identity": string;
  "openid.mode": string;
  "openid.ns": string;
  "openid.op_endpoint": string;
  "openid.response_nonce": string;
  "openid.return_to": string;
  "openid.sig": string;
  "openid.signed": string;
}

export interface IAuth0Model extends UserProfile {
  sid: string;
}

export interface IUser {
  id?: number;
  email?: string;
  walletAddress?: string;
  steamId?: string;
  auth0Sid: string;
  auth0NickName: string;
  auth0Name: string;
  auth0Sub: string;
  imageUrl?: string;
}

export interface IGame {
  id: number;
  steamId: string;
  name: string;
  description: string;
  gameUrl: string;
  logo: string;
  socialTwitter: string;
  socialDiscord: string;
  socialTelegram: string;
}
