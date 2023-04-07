import { useUser } from '@auth0/nextjs-auth0/client';
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
  const {user} = useUser();

  const [menuSelected, setMenuSelected] = React.useState<string>('My Soul'); 
  const [avatar, setAvatar] = React.useState<string>(); 

  const onMenuChange = (menu: string) => setMenuSelected(menu);
  const onChangeAvatar = useCallback((menu: string) => setAvatar(menu), []);


  useEffect(() => {
    if (!user) {
      push('/')
    }
  }, [push, user]);

  return (
    <GlobalContext.Provider
      value={{menuSelected, onMenuChange, onChangeAvatar, avatar}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
