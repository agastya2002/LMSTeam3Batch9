import React, { useEffect } from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../Contexts/AuthContext'
import swal from 'sweetalert';


const Login=()=>{

    const navigate = useNavigate();
    const [eID,setEID]=useState("");
    const [ePass, setEPass] = useState("");
    const {user, login} = useAuth();
    let isDataValid=true;


    const validateEntries=()=>{
        //check employee ID
        if (!eID.match(/[A-Z]{1}[0-9]/)){
            swal("Error","Invalid employee ID format!","error");
            isDataValid=false;
        }
        if(ePass.length===0){
            swal("Error","Please enter a valid password","error");
            isDataValid=false;
        }
        if(isDataValid) {
            const res = login(eID, ePass);
            if(res) {
               
                console.log(res);
                res.then((r) => {
                    if(r==="admin") {
                        navigate("AdminDashboard");
                    }
                    else if(r==="customer"){
                        navigate("UserDashboard");
                    }
                });
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