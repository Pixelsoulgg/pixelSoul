import { createReducer } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import build from "next/dist/build";
import { IWalletInfo } from "../../types";

import {generateContract, getScoreAction, logoutAction, setProvider } from "./account.actions";


export const DEFAULT_MES = 'Something error!';

export interface AccountState {
  web3Provider?: ethers.providers.Web3Provider;
  walletInfo?: IWalletInfo; 
  steamInfo?: any;

  score?: any;
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
});
