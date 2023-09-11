import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../Contexts/AuthContext'

const Login=()=>{

    const [eID,setEID]=useState("");
    const [ePass, setEPass] = useState("");
    const {user, login, logout} = useAuth();
    let isDataValid=true;

    // Example JSON object for registering employee
    // {
    //     "employeeId": "E0006",
    //     "employeeName": "John Doe",
    //     "designation": "Manager",
    //     "department": "IT",
    //     "gender": "M",
    //     "dateOfBirth": "2023-09-11T03:49:32.942Z",
    //     "dateOfJoining": "2023-09-11T03:49:32.942Z",
    //     "employee": {
    //       "employeeId": "E0006",
    //       "employeePassword": "25efd29860a4f83a7c971bdcfb3eb771c95dab9356b7dec0aa165eb80bfd817f",
    //       "employeeRole": "customer"
    //     }
    //   }

    const validateEntries=()=>{
        //check employee ID
        if (!eID.match(/[A-Z]{1}[0-9]/)){
            alert("Invalid employee ID format!");
            isDataValid=false;
        }
        if(ePass.length===0){
            alert("Please enter password");
            isDataValid=false;
        }
        console.log(isDataValid);
        if(isDataValid) {
            login(eID, ePass);
        }
    }
    return (
        <div>
            <div>
                <h1>Loan Management Application</h1>
                <h2>Login</h2>
            </div>
            <div className='customer_details'>
                <div className='employee_details'>
                    <div className='employee_detail'>
                        <span className='employee_field'>Employee id</span>
                        <input type="text" id="eid" onChange={(e) => setEID(e.target.value)} />
                    </div>
                </div>
                <div className='employee_details'>
                    <div className='employee_detail'>
                        <span className='employee_field'>Password</span>
                        <input type="password" id="pass" onChange={(p) => setEPass(p.target.value)} />
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={()=>validateEntries()}>Login</button>
                </div>
            </div>
            <div>New User? <Link to="/register">Register here</Link></div>
        </div>
    )
}

export default Login;
