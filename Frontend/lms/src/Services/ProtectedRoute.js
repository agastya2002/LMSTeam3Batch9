import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth} from '../Contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {user} = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? <Component {...props} /> : <Navigate to="/" />
            }
        />
    )
}

export default ProtectedRoute;