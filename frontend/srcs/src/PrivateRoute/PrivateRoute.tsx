import { Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

interface Props {
  component: React.ComponentType
  path?: string
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/me", { 
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${Cookies.get("access_token")}` 
      }
    })
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
  }, []);

  if (isAuth === true) {
    return <RouteComponent />
  }
  return <Navigate to="/login" />
}