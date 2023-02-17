import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../axios";

interface Props {
  loading: React.ComponentType;
  component: React.ComponentType;
  default: string;
}

export const PrivateRoute: React.FC<Props> = ({
  component: Component,
  loading: LoadingComponent,
  default: defaultRoute,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get("/auth/me", {withCredentials: true });

    axios.interceptors.response.use(
      function (response) {
        setIsAuth(true);
        setIsLoading(true);
        return response;
      },
      function (error) {
        console.log("echec");
        setIsLoading(true);
        setIsAuth(false);
      }
    );
    // axios
    //   .get("/auth/me")
    //   .then((res) => {
    //     setIsAuth(true);
    //     setIsLoading(true);
    //   })
    //   .catch((err) => {
    //     console.log("echec");
    //     setIsLoading(true);
    //     setIsAuth(false);
    //   });
  }, []);

  return (
    <>
      {isLoading ? (
        isAuth ? (
          <Component />
        ) : (
          <Navigate to={defaultRoute} />
        )
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};
