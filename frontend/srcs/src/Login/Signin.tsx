// import LoginForm from "./LoginForm/LoginForm";
import LoginForm from "./LoginForm/LoginForm";
import Icon42 from "./Icon42";
import GoogleAuth from "./GoogleAuth/GoogleAuth";
import Auth42 from "./Auth42/Auth42";

function Signin() {
  return (
    <div>
      <div className="form-container sign-in-container">
        <h1>Sign in</h1>
        <div className="social-container">
          <GoogleAuth />
          <Auth42 />
        </div>
        <span>or use your account</span>
        <LoginForm />
      </div>
    </div>
  );
}

export default Signin;
