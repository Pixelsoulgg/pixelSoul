import AppApi from "@/apis/app.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NFTResponse } from "@/types/nft.type";
import { SteamUser } from "@/types/steam.type";
import SteamApi from "@/apis/steam.api";

interface SoulState {
  nfts?: NFTResponse;
  isFetchingNft: boolean;

  steamUser?: SteamUser;
  isFetchingSteamUser?: boolean;
  

  myCollectibles: string[];
}

const initialState: SoulState = {
  isFetchingNft: false,
  myCollectibles: [],
};

export const soulSlice = createSlice({
  name: "my-soul",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNFTsAction.fulfilled, (state, {payload}) => {    
      state.nfts = payload;
      state.isFetchingNft = false;
    });
    builder.addCase(getNFTsAction.pending, (state) => {      
      state.isFetchingNft = true;
    });
    builder.addCase(getNFTsAction.rejected, (state) => {      
      state.isFetchingNft = false;
    });

    builder.addCase(getSteamPlayerGeneralAction.fulfilled, (state, {payload}) => {    
      state.steamUser = payload;
      state.isFetchingSteamUser = false;
    });
    builder.addCase(getSteamPlayerGeneralAction.pending, (state) => {      
      state.isFetchingSteamUser = true;
    });
    builder.addCase(getSteamPlayerGeneralAction.rejected, (state) => {      
      state.isFetchingSteamUser = false;
    });
  },
});

// export const { steamAuthSuccess } = soulSlice.actions;
export default soulSlice.reducer;

export const getNFTsAction = createAsyncThunk<NFTResponse, string>(
  "my-soul/getNFTAction",
  async (address) => {  
    const appApi = new AppApi();
    const rs = await appApi.getNfts(address);
    return rs;
  }
);

export const getSteamPlayerGeneralAction = createAsyncThunk<SteamUser, string>(
  "my-soul/getSteamPlayerGeneralAction",
  async (address) => {   
    const steamApi = new SteamApi();
    const rs = await steamApi.getPlayerGeneral(address);
    return rs;
  }
);