import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';

const CustomerDetails=()=>{

    const [eID,setEID]=useState("");
    const [eName,setEName]=useState("");
    const [department,setDepartment]=useState("");
    const [gender,setGender]=useState("");
    const [designation,setDesignation]=useState("");
    const [dob,setDob]=useState("");
    const [doj,setDoj]=useState("");
    let isDataValid=true;

    const validateEntries=()=>{
        //check employee ID
        if (!eID.match(/[A-Z]{1}[0-9]/)){
            alert("Invalid employee ID format!");
            isDataValid=false;
        }
        if(eName.length===0){
            alert("Please enter employee name!");
            isDataValid=false;
        }
        if(!eName.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)){
            alert("Employee name is invalid!\nUse of special characters and numbers is not allowed")
            isDataValid=false;
        }
        if(dob.length===0){
            alert("Please enter date of birth!");
            isDataValid=false;
        }
        if(doj.length===0){
            alert("Please enter date of joining!");
            isDataValid=false;
        }
        console.log(isDataValid);
    }
    return (
        <div>
            <div>
                <h1>Loan Management Application</h1>
                <h2>Customer Master Data Details</h2>
            </div>
            <div className='customer_details'>
                <div className='employee_details'>
                    <div className='employee_detail'>
                        <span className='employee_field'>Employee id</span>
                        <input type="text" id="eid" onChange={(e) => setEID(e.target.value)} />
                    </div>
                    <div className='employee_detail'>
                        <span className='employee_field'>Employee Name</span>
                        <input type="text" id="ename" onChange={(e) => setEName(e.target.value)}/>
                    </div>
                </div>
                <div className='employee_details'>
                    <div className='employee_detail'>
                    <span className='employee_field'>Department</span>
                        <div>
                            <select name="department" id="department" onChange={(e) => setDepartment(e.target.value)}> 
                                <option value="it">IT</option> 
                                <option value="finance">Finance</option> 
                                <option value="sales">Sales</option> 
                                <option value="hr">HR</option> 
                            </select>
                        </div>
                    </div>
                    <div className='employee_detail'>
                    <span className='employee_field'>Gender</span>
                        <div>
                            <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)}> 
                                <option value="male">Male</option> 
                                <option value="female">Female</option>
                            </select>    
                        </div>
                    </div>
                    <div className='employee_detail'>
                        <span className='employee_field'>Designation</span>
                        <div>
                            <select name="designation" id="designation" onChange={(e) => setDesignation(e.target.value)}> 
                                <option value="manager">Manager</option> 
                                <option value="ca">CA</option> 
                                <option value="dgm">DGM</option> 
                                <option value="associate">Associate</option> 
                            </select>
                        </div>
                    </div>
                </div>
                <div className='employee_details'>
                    <div className='employee_detail'>
                    <span className='employee_field'>Date Of Birth</span>
                        <div><input type="date" id="dob" onChange={(e) => setDob(e.target.value)}/></div>
                    </div>
                    <div className='employee_detail'>
                    <span className='employee_field'>Date Of Joining</span>
                        <div><input type="date" id="doj" onChange={(e) => setDoj(e.target.value)} /></div>
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={()=>validateEntries()}>Add Data</button>
                </div>
            
            </div>
        </div>
    )
}

export default CustomerDetails;
