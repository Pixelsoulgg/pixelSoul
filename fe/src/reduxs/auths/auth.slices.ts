import AppApi from "@/apis/app.api";
import { IAuth0Model, IUser, OpenIDData } from "@/types";
import StorageHelpers from "@/utils/localstore.helpers";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store from "../store";

interface AuthState {
  steamInfo?: OpenIDData;
  auth0Info?: IUser;
  steamId?: string;
  auth0Sub: string;
  accessToken?: string;
}

const initialState: AuthState = {
  steamInfo: undefined,
  auth0Sub: "",
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
      state.auth0Sub = action.payload.auth0Sub;
      if (!state.steamId && action.payload.steamId) {
        state.steamId = action.payload.steamId;
      }
    },
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSteamInfoAction.fulfilled, (state, { payload }) => {
      state.steamInfo = payload;
      state.steamId = payload?.steamId;
    });
    builder.addCase(setSteamInfoAction.fulfilled, (state, { payload }) => {
      state.steamInfo = payload;
      state.steamId = payload.steamId;
    });
    builder.addCase(updateUserAvatarAction.fulfilled, (state, { payload }) => {
      if (payload) {
        state.auth0Info = payload;
      }
    });
  },
});

export const { steamAuthSuccess, setAccessToken, auth0LoginSuccess } = authSlice.actions;
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
    const { auth } = store.getState();
    const claimed_id = model["openid.claimed_id"];
    const params = claimed_id.split("/");
    const steamId = params[params.length - 1];
    model.steamId = steamId;
    const appApi = new AppApi();
    await appApi.addSteamInfo(auth.auth0Info?.auth0Sub || "", steamId);
    return model;
  }
);

export const handleAuth0LoginSuccess = createAsyncThunk<void, IAuth0Model>(
  "authentication/auth0LoginSuccess",
  async (model) => {
    const api = new AppApi();
    const { sub } = model;   
    if (sub) {
      let userInfo: IUser = await api.getUserById(sub);
      if (!userInfo) {
        userInfo = await api.createUser({
          auth0NickName: model.nickname!,
          auth0Sid: model["sid"] || "",
          auth0Name: model.name || "",
          auth0Sub: sub,
          claimSteamChest: 0,
          claimWalletChest: 0,
          claimSuiChest: 0,
          grantRole: [],
          referredBy: model.referredBy
        });
      }
      store.dispatch(authSlice.actions.auth0LoginSuccess(userInfo));
    }
  }
);

export const handleConnectMetamaskSuccess = createAsyncThunk<
  void,
  { walletAddress: string }
>("authentication/connectMetamaskSuccess", async (model) => {
  const api = new AppApi();
  const { auth0Sub } = store.getState().auth;
  const { walletAddress } = model;
  if (auth0Sub) {
    const user: IUser = await api.addWallet(auth0Sub, walletAddress);
  }
});

export const updateUserAvatarAction = createAsyncThunk<
  IUser | undefined,
  string
>("authentication/updateUserAvatarAction", async (urlImage) => {
  const { auth0Sub } = store.getState().auth;
  const appApi = new AppApi();
  if (auth0Sub) {
    const rs = await appApi.updateUserAvatar(auth0Sub, urlImage);
    return rs;
  }
  return undefined;
});
