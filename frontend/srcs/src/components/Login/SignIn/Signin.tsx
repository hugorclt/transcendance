import LoginForm from "./LoginForm/LoginForm";
import Icon42 from "../Icons/Icon42";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

function Signin() {
  const url42: string = import.meta.env["VITE_42URL"]!;

  return (
    <div>
      <div className="form-container sign-in-container">
        <h1>Sign in</h1>
        <div className="flex social-container">
          <GoogleAuth />
          <a href={url42} className="social">
            <Icon42 />
          </a>
        </div>
        <span>or use your account</span>
        <LoginForm />
      </div>
    </div>
  );
}

export default Signin;
