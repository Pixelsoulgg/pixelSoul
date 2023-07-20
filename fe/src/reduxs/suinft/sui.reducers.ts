import { createReducer } from "@reduxjs/toolkit";
import { ISoulTagNft, ISuiNftItem } from "@/types/nft.type";
import { checkSoulTagAction, getSuiNFTAction } from "./sui.actions";

export const DEFAULT_MES = "Something error!";

export interface SuiNftState {
  nfts: ISuiNftItem[];
  soulTagNft?: ISoulTagNft;
}

const initialState: SuiNftState = {
  nfts: [], 
};

export const suiNftReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSuiNFTAction.fulfilled, (state, { payload }) => {   
    state.nfts = payload;
  });

  builder.addCase(checkSoulTagAction.fulfilled, (state, { payload }) => {   
    state.soulTagNft = payload;
  });

});

export default suiNftReducer;
