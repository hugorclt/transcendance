import { Navigate } from 'react-router-dom'
import React from 'react';

interface Props {
  component: React.ComponentType
  path?: string
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  function handleAuth() : boolean {
    
  }

  const isAuthenticated : boolean = handleAuth;

  if (isAuthenticated) {
    return <RouteComponent />
  }
  return <Navigate to="/login" />
}