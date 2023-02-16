import { Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

interface Props {
  component: React.ComponentType
  loading: React.ComponentType
  default: React.ComponentType
  path?: string
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, loading: LoadingComponent, default: DefaultComponent }) => {
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
        setIsAuth(true);
        setIsLoading(true);
      }).catch(err => {
        setIsLoading(true);
        setIsAuth(false);
      })
  }, []);

  if (!isLoading) return <LoadingComponent/>;

  if (isAuth === true) {
    return <RouteComponent />
  }
  return <DefaultComponent/>
}