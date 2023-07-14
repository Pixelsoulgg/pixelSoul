import { createReducer } from "@reduxjs/toolkit";
import { ISuiNftItem } from "@/types/nft.type";
import { checkSoulTagAction, getSuiNFTAction } from "./sui.actions";

export const DEFAULT_MES = "Something error!";

export interface SuiNftState {
  nfts: ISuiNftItem[];
  isMintedSoulTag: boolean;
}

const initialState: SuiNftState = {
  nfts: [],
  isMintedSoulTag: false,
};

export const suiNftReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSuiNFTAction.fulfilled, (state, { payload }) => {   
    state.nfts = payload;
  });

  builder.addCase(checkSoulTagAction.fulfilled, (state, { payload }) => {   
    state.isMintedSoulTag = payload;
  });

});

export default suiNftReducer;
