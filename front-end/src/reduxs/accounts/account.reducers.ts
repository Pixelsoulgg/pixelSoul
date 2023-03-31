import { createReducer } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { IWalletInfo } from "../../types";

import {generateContract, logoutAction, setProvider } from "./account.actions";


export const DEFAULT_MES = 'Something error!';

export interface AccountState {
  web3Provider?: ethers.providers.Web3Provider;
  walletInfo?: IWalletInfo; 
  steamInfo?: any;
}

const initialState: AccountState = {};

export const accountReducer = createReducer(initialState, (builder) => { 
  builder.addCase(setProvider, (state, { payload }) => {
    state.web3Provider  = payload;    
  }); 

  builder.addCase(generateContract.fulfilled, (state, {payload}) => {
      state.walletInfo = payload;
  });

  // logout
  builder.addCase(logoutAction, (state) => {
    Object.assign(state, initialState);
  });
});
