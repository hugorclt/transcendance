import Heptahedre from "../../components/common/Heptahedre/Heptahedre";
import AuthForm from "../../components/Login/AuthForm";
import { LoginHeaderContainer, LoginLayoutContainer } from "./LoginLayoutStyle";
import { Heading1 } from "../../components/common/commonStyle";

const LoginLayout = () => {
  return (
    <main>
      <LoginLayoutContainer>
        <LoginHeaderContainer>
          <Heptahedre />
          <Heading1>
            PONG
            <br />
            CHAMPIONS
          </Heading1>
        </LoginHeaderContainer>
        <AuthForm />
      </LoginLayoutContainer>
    </main>
  );
};

export default LoginLayout;
