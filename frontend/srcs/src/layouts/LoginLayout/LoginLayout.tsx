import MediaQuery from "react-responsive";
import HeptaHeader from "../../components/General/Heptahedre/HeptaHeader";
import AuthForm from "../../components/Login/AuthForm";
import { mediaSize } from "../../mediaSize";
import { LoginLayoutContainer } from "./LoginLayoutStyle";

const LoginLayout = () => {
  return (
    <main>
      {/* desktop */}
      <MediaQuery minWidth={mediaSize.desktop}></MediaQuery>

      {/* tablet */}
      <MediaQuery
        maxWidth={mediaSize.tablet}
        minWidth={mediaSize.mobile + 1}></MediaQuery>

      {/* mobile */}
      <MediaQuery maxWidth={mediaSize.mobile}>
        <HeptaHeader firstText="PONG" secondText="CHAMPIONS" />
        <LoginLayoutContainer>
          <AuthForm />
        </LoginLayoutContainer>
      </MediaQuery>
    </main>
  );
};

export default LoginLayout;
