import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../Contexts/AuthContext'

const Login=()=>{

    const navigate = useNavigate();
    const [eID,setEID]=useState("");
    const [ePass, setEPass] = useState("");
    const {user, login} = useAuth();
    let isDataValid=true;


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
        if(isDataValid) {
            login(eID, ePass);
            console.log(user);
            if(user) {
                navigate("profile");
            }
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
