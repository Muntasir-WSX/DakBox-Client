import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/SharedCopmponents/Loading/Loading';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth();
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        <Navigate to="/signin"></Navigate>
    }
    return children;
};

export default PrivateRoutes; 