import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/SharedCopmponents/Loading/Loading';
import { Navigate, useLocation } from 'react-router-dom'; 

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation(); 
     if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
       
        return <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    }
    
    return children;
};

export default PrivateRoutes;