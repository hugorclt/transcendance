import { Navigate } from 'react-router-dom'
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  component: React.ComponentType
  path?: string
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  axios.get("http:localhost/auth/me", { withCredentials: true})
    .then((res) => {
      if (res.status >= 200 && res.status <= 204) {
        setIsAuth(true);
        setIsLoading(true);
      }
      else {
        setIsLoading(true);
        setIsAuth(false);
      }
  })

  while (isLoading === false) {}

  if (isAuth === true) {
    return <RouteComponent />
  }
  return <Navigate to="/login" />
}