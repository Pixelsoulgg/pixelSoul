import AppApi from "@/apis/app.api";
import { IAuth0Model, IUser, OpenIDData } from "@/types";
import StorageHelpers from "@/utils/localstore.helpers";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { PayloadAction, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store from "../store";

interface AuthState {
  steamInfo?: OpenIDData;
  auth0Info?: IUser;
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
    auth0LoginSuccess: (state, action: PayloadAction<IUser>) => {
      state.auth0Info = action.payload;
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
    const {auth} = store.getState();
    const storage = new StorageHelpers();
    storage.setSteamInfo(model);
    const appApi = new AppApi();
    await appApi.addSteamInfo(auth.auth0Info?.auth0Sid || '', model["openid.sig"])
    return model;   
  }
);

export const handleAuth0LoginSuccess = createAsyncThunk<void, IAuth0Model>(
  "authentication/auth0LoginSuccess"
, async(model) => { 
  const api = new AppApi();
  const {sid} = model;
  let userInfo: IUser = await api.getUserById(sid);
  if (!userInfo) { 
    userInfo = await api.createUser({
      auth0NickName: model.nickname!,
      auth0Sid: model['sid'] || '',
      auth0Name: model.name || '',
      auth0Sub: model.sub || '',
    });
  }
  store.dispatch(authSlice.actions.auth0LoginSuccess(userInfo));
});

export const handleConnectMetamaskSuccess = createAsyncThunk<void, {walletAddress: string; auth0Id: string}>(
  "authentication/auth0LoginSuccess"
, async(model) => { 
  const api = new AppApi();
  const {walletAddress, auth0Id} = model;
  const user: IUser = await api.addWallet(auth0Id, walletAddress);
  store.dispatch(authSlice.actions.auth0LoginSuccess(user));
});
