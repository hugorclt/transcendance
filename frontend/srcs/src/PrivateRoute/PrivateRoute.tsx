import { Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import Cookies from 'js-cookie'

interface Props {
  loading: React.ComponentType
  component: React.ComponentType
  default: string
}

export const PrivateRoute: React.FC<Props> = ({ component: Component, loading: LoadingComponent, default: defaultRoute }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get("/auth/me", {})
      .then((res) => {
        setIsAuth(true);
        setIsLoading(true);
      }).catch(err => {
        setIsLoading(true);
        setIsAuth(false);
      })
  }, []);

  return (
    <>
      {isLoading ? (isAuth ? <Component /> : <Navigate to={defaultRoute} />) : <LoadingComponent />}
    </>
  )
}