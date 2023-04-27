import { getSteamInfoAction, handleAuth0LoginSuccess } from '@/reduxs/auths/auth.slices';
import { useAppDispatch } from '@/reduxs/hooks';
import { IAuth0Model } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

interface IGlobalContext {
 menuSelected: string;
 onMenuChange?: (menu: string) => void; 
 onChangeAvatar?:(v: string) => void;
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

  const [menuSelected, setMenuSelected] = React.useState<string>('/my-souls'); 
  const onMenuChange = (menu: string) => setMenuSelected(menu);

  const handleInitialState= useCallback( async () => {
    const me = (await axios.get('/api/auth/me')).data as IAuth0Model;
    if (!me) {
      push('/')
    }
    dispatch(handleAuth0LoginSuccess(me));
    dispatch(getSteamInfoAction());
  }, [dispatch, push]);

  useEffect(() => {  
    handleInitialState();
  }, [handleInitialState]);

  return (
    <GlobalContext.Provider
      value={{menuSelected, onMenuChange}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
