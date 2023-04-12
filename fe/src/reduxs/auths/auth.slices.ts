import { OpenIDData } from "@/types";
import StorageHelpers from "@/utils/localstore.helpers";
import { PayloadAction, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  steamInfo?: OpenIDData;
}

const initialState: AuthState = {
  steamInfo: undefined,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    steamAuthSuccess: (state, action: PayloadAction<OpenIDData>) => {
      state.steamInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSteamInfoAction.fulfilled, (state, {payload}) => {    
      state.steamInfo = payload;
    });
    builder.addCase(setSteamInfoAction.fulfilled, (state, {payload}) => {      
      state.steamInfo = payload;
    });
  },
});

export const { steamAuthSuccess } = authSlice.actions;
export default authSlice.reducer;

export const getSteamInfoAction = createAsyncThunk<OpenIDData | undefined>(
  "authentication/getSteamInfo",
  async () => {
    const storage = new StorageHelpers();
    const model = storage.getSteamInfo();
    return model;
  }
);

export const setSteamInfoAction = createAsyncThunk<OpenIDData, OpenIDData>(
  "authentication/setSteamInfo",
  async (model) => {
    const storage = new StorageHelpers();
    storage.setSteamInfo(model);
    return model;   
  }
);
