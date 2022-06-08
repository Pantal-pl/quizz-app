import { Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
const ProtectedRoute = ({Component}) => {
    const { isAuthenticated } = useAuth0();
    const auth = isAuthenticated;

    return auth ? Component : <Navigate to="/" />
}

export default ProtectedRoute