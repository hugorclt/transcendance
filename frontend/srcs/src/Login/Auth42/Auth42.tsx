import React from "react";
import Login42 from "react-42-login";

function Auth42() {
  const id42: string = process.env["REACT_APP_42UID"]!;

  return (
    <div>
      <Login42
        clientId={id42}
        onFailure={() => {
          console.log("NOO")
        }}
        onSuccess={() => {
          console.log("Yes")

        }}
        route="/auth/42/login"
        redirectUri="http://localhost:3002/"
      >
        42
      </Login42>
    </div>
  );
}

export default Auth42;
