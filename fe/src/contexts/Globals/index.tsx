import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getRedirectAuthUrl } from '../../utils';

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
  const {user} = useUser();
  const router = useRouter();
  const [menuSelected, setMenuSelected] = React.useState<string>('Dashboard'); 

  const onMenuChange = (menu: string) => setMenuSelected(menu);

  useEffect(() => {
    // if(!user) {
    //     router.push(getRedirectAuthUrl() || '')
    // }
    console.log({user})
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{menuSelected, onMenuChange}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
