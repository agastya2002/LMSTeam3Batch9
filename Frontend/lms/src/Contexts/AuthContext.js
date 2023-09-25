import React, {createContext, useContext, useState } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import swal from 'sweetalert';
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider =  ({ children }) => {
    
    const [user, setUser] = useState({
      userId: '',
      userRole:'',
      userName:''
    });

    const [token,setToken] = useState(null)

    // const updateUserId = (uId) =>{
    //   setUser({...user,userId: uId});
    // };

    // const updateUserRole = (uRole) =>{
    //   setUser({...user,userRole: uRole});
    // };

    const updateUser = (user) => {
      setUser(user);
      if(user){
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      else{
        sessionStorage.removeItem("user");
      }
      
    }

    const updateToken = (token) => {
      setToken(token);
      if(token){
        sessionStorage.setItem("token", token);
      }
      else{
        sessionStorage.removeItem("token");
      }
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
          swal("Signup Successful",`Your details have been added (Employee ID = ${resp.data})`,"success");
          // updateUserId(userData.EmployeeId);
          // updateUserRole(userData.Employee.EmployeeRole);
          // updateUser({userId:resp.data,userRole:userData.EmployeeRole})
          return true;
        }
      }
      catch(err){
        swal("Signup Unsuccessful","Something unexpected happened, please try again","error")
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
          // updateUserId(resp.data.user_Id);
          swal("Login Successful","You have been successfully logged in","success");
          updateToken (resp.data.token);
          //  updateUserRole(resp.data.role);
          updateUser({userId:resp.data.user_Id,
                        userRole:resp.data.role,
                      userName: resp.data.employeeName})
          return resp.data.role;
        }
      }
      catch(err){
        console.log(err)
        swal("Login Unsuccessful","Your credentials are wrong","error")
        console.log("Invalid Creadentials")
        return false;
      }
    }

    const logout = () => {
      updateUser(null);
      updateToken(null);
        swal("Logged out","You have been successfully logged out","success")
    };

    const  applyForLoan = async (loanData) => {
      try{
        const resp = await axios.post(`${baseURL}/customer/applyForLoan`,
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

    const addEmployee = async (userData) => {
      try{
        const resp = await axios.post(`${baseURL}/register`,
          userData,{
          headers:{
              "Content-Type":'application/json'
          }
        })
        console.log(resp)
        if(resp.status===200){
          swal("Employee added successfully",`Employee ID = ${resp.data}`,"success");
          return true;
        }
      }
      catch(err){
        swal("Unable to add employee","Something unexpected happened, please try again","error")
        console.log(err)
        return false;
      }
    }

    return (
        <AuthContext.Provider value={{user, register, login, logout, token,applyForLoan, addEmployee}}>
            {children}
        </AuthContext.Provider>
    )
}