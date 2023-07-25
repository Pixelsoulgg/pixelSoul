import { createReducer } from "@reduxjs/toolkit";
import { ISoulTagNft, ISuiNftItem } from "@/types/nft.type";
import { checkSoulTagAction, getSuiNFTAction, getSuiTagProfileAction } from "./sui.actions";

export const DEFAULT_MES = "Something error!";

export interface SuiNftState {
  nfts: ISuiNftItem[];
  soulTagNft?: ISoulTagNft;
  reputation: string;
}

const initialState: SuiNftState = {
  nfts: [], 
  reputation: '0',
};

export const suiNftReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSuiNFTAction.fulfilled, (state, { payload }) => {   
    state.nfts = payload;
  });

  builder.addCase(checkSoulTagAction.fulfilled, (state, { payload }) => {   
    state.soulTagNft = payload;
  });

  builder.addCase(getSuiTagProfileAction.fulfilled, (state, { payload }) => {   
    state.reputation = payload;
  });

});

export default suiNftReducer;
