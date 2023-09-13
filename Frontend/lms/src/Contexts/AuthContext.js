import React, {createContext, useContext, useState } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider =  ({ children }) => {
    
    const [user, setUser] = useState({
      userId: '',
      userRole:'',
    });

    const updateUserId = (uId) =>{
      setUser({...user,userId: uId});
    };

    const updateUserRole = (uRole) =>{
      setUser({...user,userRole: uRole});
    };

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
        if(resp.status===200){
          updateUserId(userData.EmployeeId);
          updateUserRole(userData.Employee.EmployeeRole);
          return true;
        }
      }
      catch(err){
        console.log(err)
        return false;
      }
       
         
    }
    const login = async(eID, ePass) => {
      try{
        ePass = sha256(ePass)
        const resp = await axios.post(`${baseURL}/login`,
        {
          Username: eID,
          Password: ePass
        },{
          headers:{
              "Content-Type":'application/json'
          }
        })
        if(resp.status===200){
          updateUserId(resp.data.user_Id);
          console.log(resp.data.role);
          updateUserRole(resp.data.role);
          return resp.data.role;
        }
      }
      catch(err){
        alert("Invalid credentials")
        console.log("Invalid Creadentials")
        return false;
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