import { getSteamInfoAction, handleAuth0LoginSuccess, setAccessToken } from '@/reduxs/auths/auth.slices';
import { useAppDispatch } from '@/reduxs/hooks';
import { IAuth0Model } from '@/types';
import axios from 'axios';
import axiosInstance from '@/apis';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

interface IGlobalContext {
 menuSelected: string;
 onMenuChange?: (menu: string) => void; 
 onChangeAvatar?:(v: string) => void;
 me?: IAuth0Model;
}

interface ProviderProps {
  children: React.ReactNode;
}

const GlobalContext = React.createContext<IGlobalContext>({
  menuSelected: '',
});

export const GlobalContextProvider: React.FC<ProviderProps> = ({children}) => {
  const {push} = useRouter();
  const dispatch = useAppDispatch();
  const [meModel, setMeModel] = useState<IAuth0Model>();

  const [menuSelected, setMenuSelected] = React.useState<string>('/my-souls'); 
  const onMenuChange = (menu: string) => setMenuSelected(menu);

  const handleGetAccessToken= useCallback( async () => {
    try {
      const rs:any = (await axios.get('/api/check')).data;
      if (rs.accessToken) {
        dispatch(setAccessToken(rs.accessToken));
        axiosInstance.interceptors.request.use((conf) => {
          conf.headers.Authorization = `Bearer ${rs.accessToken}`;
          return conf;
        })
      }
    } catch(ex) {}   
  }, []);

  const handleInitialState= useCallback( async () => {
    const me = (await axios.get('/api/auth/me')).data as IAuth0Model;
    if (!me) {
      push('/')
    }
    setMeModel(me);
    await handleGetAccessToken();
    dispatch(handleAuth0LoginSuccess(me));
    dispatch(getSteamInfoAction());
  }, [dispatch, push]);

  useEffect(() => {  
    handleInitialState();
  }, [handleInitialState]);

  return (
    <GlobalContext.Provider
      value={{menuSelected, onMenuChange, me: meModel}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
