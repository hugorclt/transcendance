import React, {
  useState,
  createContext,
  Dispatch,
  ReactNode,
  useContext,
} from "react";

type TNavBarPageContext = {
  selectedTab: number;
  setSelectedTab: Dispatch<React.SetStateAction<number>>;
};

const defaultValue = {
  selectedTab: 0,
  setSelectedTab: () => {},
};

export const NavBarContext = createContext<TNavBarPageContext>(defaultValue);

type NavBarProviderProps = {
  children: ReactNode;
};

export function NavBarProvider({ children }: NavBarProviderProps) {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <NavBarContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
}

export function useNavBarContext(): TNavBarPageContext {
  return useContext(NavBarContext);
}

export default NavBarProvider;
