import React, {
  useState,
  createContext,
  Dispatch,
  ReactNode,
  useContext,
} from "react";

const defaultValue = {
  selectedMode: "",
  setSelectedMode: () => {},
  onModeSelected: false,
  setOnModeSelected: () => {},
  players: 0,
  setPlayers: () => {},
};

type TLobbyCreatorPageContext = {
  selectedMode: string;
  setSelectedMode: Dispatch<React.SetStateAction<string>>;
  onModeSelected: boolean;
  setOnModeSelected: Dispatch<React.SetStateAction<boolean>>;
  players: number;
  setPlayers: Dispatch<React.SetStateAction<number>>;
};

export const LobbyCreatorContext =
  createContext<TLobbyCreatorPageContext>(defaultValue);

type LobbyCreatorProviderProps = {
  children: ReactNode;
};

export function LobbyCreatorProvider({ children }: LobbyCreatorProviderProps) {
  const [onModeSelected, setOnModeSelected] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [players, setPlayers] = useState<number>(0);

  return (
    <LobbyCreatorContext.Provider
      value={{
        onModeSelected,
        setOnModeSelected,
        selectedMode,
        setSelectedMode,
        players,
        setPlayers,
      }}
    >
      {children}
    </LobbyCreatorContext.Provider>
  );
}

export function useLobbyCreatorContext(): TLobbyCreatorPageContext {
  return useContext(LobbyCreatorContext);
}

export default LobbyCreatorProvider;
