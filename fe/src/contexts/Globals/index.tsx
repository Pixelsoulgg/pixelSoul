import {
  getSteamInfoAction,
  handleAuth0LoginSuccess,
  setAccessToken,
} from "@/reduxs/auths/auth.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { IAuth0Model } from "@/types";
import axios from "axios";
import axiosInstance from "@/apis";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { checkSoulTagAction } from "@/reduxs/suinft/sui.actions";
import { useWallet } from "@suiet/wallet-kit";

interface IGlobalContext {
  menuSelected: string;
  onMenuChange?: (menu: string) => void;
  onChangeAvatar?: (v: string) => void;
  me?: IAuth0Model;
}

interface ProviderProps {
  children: React.ReactNode;
}

const GlobalContext = React.createContext<IGlobalContext>({
  menuSelected: "",
});

export const GlobalContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const { push, query } = useRouter();

  const dispatch = useAppDispatch();
  const { address: suiWalletAddress } = useWallet();

  const [meModel, setMeModel] = useState<IAuth0Model>();
  const [menuSelected, setMenuSelected] = React.useState<string>("/my-souls");
  const onMenuChange = (menu: string) => setMenuSelected(menu);

  const handleGetAccessToken = useCallback(async () => {
    try {
      const rs: any = (await axios.get("/api/check")).data;
      if (rs.accessToken) {
        dispatch(setAccessToken(rs.accessToken));
        axiosInstance.interceptors.request.use((conf) => {
          conf.headers.Authorization = `Bearer ${rs.accessToken}`;
          return conf;
        });
      }
    } catch (ex) {}
  }, []);

  const handleInitialState = useCallback(async () => {
    const me = (await axios.get("/api/auth/me")).data as IAuth0Model;
    if (!me) {
      push("/");
    }
    setMeModel(me);
    await handleGetAccessToken();
    const referredBy = (query?.refer || "") as string;
    dispatch(handleAuth0LoginSuccess({ ...me, referredBy }));
    dispatch(getSteamInfoAction());
  }, [dispatch, push]);

  useEffect(() => {
    handleInitialState();
  }, [handleInitialState]);

  useEffect(() => {
    if (suiWalletAddress) {
      console.log("wallet", suiWalletAddress);
      dispatch(checkSoulTagAction(suiWalletAddress));
    }
  }, [suiWalletAddress]);

  return (
    <GlobalContext.Provider value={{ menuSelected, onMenuChange, me: meModel }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
