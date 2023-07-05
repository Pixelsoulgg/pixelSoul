import { createReducer } from "@reduxjs/toolkit";
import { ISuiNftItem } from "@/types/nft.type";
import { getSuiNFTAction } from "./sui.actions";

export const DEFAULT_MES = "Something error!";

export interface SuiNftState {
  nfts: ISuiNftItem[];
}

const initialState: SuiNftState = {
  nfts: [],
};

export const suiNftReducer = createReducer(initialState, (builder) => {
  builder.addCase(getSuiNFTAction.fulfilled, (state, { payload }) => {
    console.log({sui: payload})
    state.nfts = payload;
  });
});

export default suiNftReducer;
