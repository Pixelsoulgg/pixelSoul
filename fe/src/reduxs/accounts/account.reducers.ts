import { createReducer } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import {OpenIDData, IWalletInfo} from '@/types'


import {disconnectMetamaskAction, generateContract, getScoreAction, logoutAction, setProvider } from "./account.actions";
import { IScore } from "@/types/score.types";


export const DEFAULT_MES = 'Something error!';

export interface AccountState {
  web3Provider?: ethers.providers.Web3Provider;
  walletInfo?: IWalletInfo; 
  steamInfo?: OpenIDData;
  score?: IScore;
}

const initialState: AccountState = {};

export const accountReducer = createReducer(initialState, (builder) => { 
  builder.addCase(setProvider, (state, { payload }) => {
    state.web3Provider  = payload;    
  }); 

  builder.addCase(generateContract.fulfilled, (state, {payload}) => {
      state.walletInfo = payload;
  });


  builder.addCase(getScoreAction.fulfilled, (state, {payload}) => {
    state.score = payload;
  });
  // logout
  builder.addCase(logoutAction, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(disconnectMetamaskAction, (state) => {
    state.walletInfo = undefined;
    state.web3Provider = undefined;
  });
}

);
