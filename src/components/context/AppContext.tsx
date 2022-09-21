import React, { useContext, createContext, ReactNode, useMemo, useCallback, useState } from 'react';

export interface AppProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

/* eslint-disable */
const initialState: AppProps = {
  isDarkMode: true,
  toggleDarkMode: () => {},
};
/* eslint-enable */

export const AppContext = createContext<AppProps>(initialState);

interface AppContextProviderProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialState.isDarkMode);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, setIsDarkMode]);

  const returnValue = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode,
    }),
    [isDarkMode, toggleDarkMode],
  );

  return <AppContext.Provider value={returnValue}>{children}</AppContext.Provider>;
}

export const useAppState = () => {
  const appContext = useContext(AppContext);
  return appContext;
};

export default AppContextProvider;
