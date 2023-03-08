import { LobbyLayoutBox } from "./LobbyLayoutStyle";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

const LobbyLayout = (props: LobbyLayoutProps) => {
  return <LobbyLayoutBox>{props.children}</LobbyLayoutBox>;
};

export default LobbyLayout;
