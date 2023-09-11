import React, {createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider =  ({ children }) => {
    const [user, setUser] = useState(null);

    const baseURL = "http//localhost:7223"

    const  register = (userData) => {
        axios({
            method: 'post',
            url:`${baseURL}/register`,
            data: userData,
            headers:{
                "Content-Type":'application/json'
            }
          }).then((response) => {
            console.log(response);
            setUser(userData.eID);
          }, (error) => {
            console.log(error);
          });
    }
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
        <AuthContext.Provider value={{user, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}