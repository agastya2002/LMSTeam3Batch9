import React, {createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider =  ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (eID, ePass) => {
        axios({
            method: 'post',
            url: 'https://localhost:7223/api/login',
            data: {
              employeeId: eID,
              employeePassword: ePass
            }
          }).then((response) => {
            console.log(response);
            setUser(eID);
          }, (error) => {
            console.log(error);
          });
    }

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}