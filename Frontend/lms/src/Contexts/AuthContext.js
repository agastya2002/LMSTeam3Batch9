import React, {createContext, useContext, useState } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider =  ({ children }) => {
    const [user, setUser] = useState(null);

    const baseURL = "https://localhost:7223/api"

    const  register = async (userData) => {
      try{
        const resp = await axios.post(`${baseURL}/register`,
          userData,{
          headers:{
              "Content-Type":'application/json'
          }
        })
        console.log(resp)
        if(resp.status==200){
          setUser(userData.eID);
        }
      }
      catch(err){
        console.log(err)
      }
       
         
    }
    const login = async(eID, ePass) => {
      try{
        const resp = await axios.post(`${baseURL}/login`,
        {
          Username: eID,
          Password: ePass
        },{
          headers:{
              "Content-Type":'application/json'
          }
        })
        if(resp.status==200){
          setUser(resp.data.user_Id);
        } else {
            alert("Invalid credentials")
        }
      }
      catch(err){
        console.log(err)
      }
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