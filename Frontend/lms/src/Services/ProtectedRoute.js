import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth} from '../Contexts/AuthContext';

const ProtectedRoute = ({children}) => {
    const {user} = useAuth();
   // console.log("User is ",user)

    if(!user){
        return  <Navigate to="/" replace/>
    }
    else return children
}

export default ProtectedRoute;