import { getSteamInfoAction } from '@/reduxs/auths/auth.slices';
import { useAppDispatch } from '@/reduxs/hooks';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

interface IGlobalContext {
 menuSelected: string;
 onMenuChange?: (menu: string) => void;
 avatar?: string;
 onChangeAvatar?:(v: string) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const GlobalContext = React.createContext<IGlobalContext>({
  menuSelected: '',
});

export const GlobalContextProvider: React.FC<ProviderProps> = ({children}) => {
  const {pathname, push} = useRouter();
  const dispatch = useAppDispatch();

  const [menuSelected, setMenuSelected] = React.useState<string>('My Soul'); 
  const [avatar, setAvatar] = React.useState<string>(); 

  const onMenuChange = (menu: string) => setMenuSelected(menu);
  const onChangeAvatar = useCallback((menu: string) => setAvatar(menu), []);

  const handleInitialState= useCallback( async () => {
    const me = (await axios.get('/api/auth/me')).data;
    if (!me) {
      push('/')
    }
    dispatch(getSteamInfoAction());
  }, [dispatch, push]);


  useEffect(() => {  
    handleInitialState();
  }, [handleInitialState]);

  return (
    <GlobalContext.Provider
      value={{menuSelected, onMenuChange, onChangeAvatar, avatar}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
