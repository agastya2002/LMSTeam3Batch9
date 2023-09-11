import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth} from '../Contexts/AuthContext';
import Login from '../Pages/Login';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {user} = useAuth();

    return (
        user ? <Route
            {...rest}
            render={(props) => <Component {...props} />}
        /> :
        <Route path="/" element={<Login/>} />
    )
}

export default ProtectedRoute;