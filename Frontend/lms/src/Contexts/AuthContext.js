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

    const [token,setToken] = useState(null)

    // const updateUserId = (uId) =>{
    //   setUser({...user,userId: uId});
    // };

    // const updateUserRole = (uRole) =>{
    //   setUser({...user,userRole: uRole});
    // };

    const updateUser = (user) => {
      setUser(user)
    }

    const updateToken = (token) => {
      setToken(token)
    }


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
          // updateUserId(userData.EmployeeId);
          // updateUserRole(userData.Employee.EmployeeRole);
          updateUser({userId:resp.data,userRole:userData.EmployeeRole})
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
        console.log(resp)
        if(resp.status===200){
          // updateUserId(resp.data.user_Id);
          updateToken (resp.data.token);
        //  updateUserRole(resp.data.role);
         updateUser({userId:resp.data.user_Id,userRole:resp.data.role})
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
        setToken(null)
    };

    const  applyForLoan = async (loanData) => {
      try{
        const resp = await axios.post(`${baseURL}/applyForLoan`,
        loanData,{
          headers:{
              "Content-Type":'application/json'
          }
        })
        console.log(resp)
        if(resp.status===200){
          return true;
        }
      }
      catch(err){
        console.log(err)
        return false;
      }
       
         
    };

    return (
        <AuthContext.Provider value={{user, register, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}