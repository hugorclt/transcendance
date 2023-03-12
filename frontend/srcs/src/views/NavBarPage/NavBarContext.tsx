import React, {
  useState,
  createContext,
  Dispatch,
  ReactNode,
  useContext,
} from "react";

type TNavBarPageContext = {
  selectedPage: number;
  setSelectedPage: Dispatch<React.SetStateAction<number>>;
};

const defaultValue = {
  selectedPage: 0,
  setSelectedPage: () => {},
};

export const NavBarContext = createContext<TNavBarPageContext>(defaultValue);

type NavBarProviderProps = {
  children: ReactNode;
};

export function NavBarProvider({ children }: NavBarProviderProps) {
  const [selectedPage, setSelectedPage] = useState<number>(0);

  return (
    <NavBarContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
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
