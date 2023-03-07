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

type TLobbyPageContext = {
  selectedMode: string;
  setSelectedMode: Dispatch<React.SetStateAction<string>>;
  onModeSelected: boolean;
  setOnModeSelected: Dispatch<React.SetStateAction<boolean>>;
  players: number;
  setPlayers: Dispatch<React.SetStateAction<number>>;
};

export const LobbyContext = createContext<TLobbyPageContext>(defaultValue);

type LobbyProviderProps = {
  children: ReactNode;
};

export function LobbyProvider({ children }: LobbyProviderProps) {
  const [onModeSelected, setOnModeSelected] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [players, setPlayers] = useState<number>(0);

  return (
    <LobbyContext.Provider
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
    </LobbyContext.Provider>
  );
}

export function useLobbyContext(): TLobbyPageContext {
  return useContext(LobbyContext);
}

export default LobbyProvider;
