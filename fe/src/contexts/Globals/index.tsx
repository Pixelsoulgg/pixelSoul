import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

interface IGlobalContext {
 menuSelected: string;
 onMenuChange?: (menu: string) => void;
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
  const onMenuChange = (menu: string) => setMenuSelected(menu);

  useEffect(() => {
    if (!user) {
      push('/')
    }
  }, [push, user]);

  return (
    <GlobalContext.Provider
      value={{menuSelected, onMenuChange}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
