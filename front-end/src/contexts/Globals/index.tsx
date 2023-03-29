import React from 'react';

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
  const [menuSelected, setMenuSelected] = React.useState<string>('Dashboard'); 

  const onMenuChange = (menu: string) => setMenuSelected(menu);

  return (
    <GlobalContext.Provider
      value={{menuSelected, onMenuChange}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
