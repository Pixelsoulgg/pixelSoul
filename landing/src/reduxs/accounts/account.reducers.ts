import { createReducer } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { IWalletInfo } from "../../types";

import {generateContract, logoutAction, setActiveMenu, setProvider } from "./account.actions";


export const DEFAULT_MES = 'Something error!';

export interface AccountState {
  selectedMenu: string,
  web3Provider?: ethers.providers.Web3Provider;
  walletInfo: IWalletInfo;
  flip: {
    isLoading: boolean;   
    errorMsg: string;
  },
}

const initialState: AccountState = {
  selectedMenu: 'PLAY',
  walletInfo: {
    address: '',
    bnbBalance: 0, 
  },
  flip: {
    errorMsg: '',
    isLoading: false,    
  }
};

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
  builder.addCase(setActiveMenu, (state, {payload}) => {
    state.selectedMenu = payload;
  });  
});
