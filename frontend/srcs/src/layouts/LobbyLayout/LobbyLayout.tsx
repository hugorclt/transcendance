import Lobby from "../../components/Lobby/Lobby";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

const LobbyLayout = (props: LobbyLayoutProps) => {
  return <main className="w-full h-full">{props.children}</main>;
};

export default LobbyLayout;
