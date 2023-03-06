import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useContext,
} from "react";

export type GameStateInterface = {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};

const defaultState = {
  status: "",
  setStatus: () => {},
} as GameStateInterface;

export const GameContext = createContext<GameStateInterface>(defaultState);

type GameProviderProps = {
  children: ReactNode;
};

export function GameProvider({ children }: GameProviderProps) {
  const [status, setStatus] = useState<string>("");

  return (
    <GameContext.Provider value={{ status, setStatus }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext(): GameStateInterface {
  return useContext(GameContext);
}

export default GameProvider;
