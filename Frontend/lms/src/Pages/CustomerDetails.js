import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link } from 'react-router-dom';

const CustomerDetails=()=>{

    const {register}  = useAuth();
    const [eID,setEID]=useState("");
    const [ePass, setEPass] = useState("");
    const [eName,setEName]=useState("");
    const [eRole,setERole]=useState("");
    const [department,setDepartment]=useState("");
    const [gender,setGender]=useState("");
    const [designation,setDesignation]=useState("");
    const [dob,setDob]=useState("");
    const [doj,setDoj]=useState("");
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

    const validateEntries=async ()=>{
        //check employee ID
        if (!eID.match(/[A-Z]{1}[0-9]/)){
            alert("Invalid employee ID format!");
            isDataValid=false;
        }
        if(eName.length===0){
            alert("Please enter employee name!");
            isDataValid=false;
        }
        if(ePass.length===0){
            alert("Please enter password");
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
        if(eRole != 'customer' || eRole!= 'admin'){
            alert("Please mention the role of employee");
            isDataValid = false;
        }

        if(isDataValid===false){
            return;
        }

        const userData = {
            employeeId: eID,
            employeeName: eName,
            designation,
            department,
            gender,
            dateOfBirth: dob,
            dateOfJoining: doj,
            employee: {
            employeeId: eID,
            employeePassword: ePass,
            employeeRole: eRole
            }
        }
        register(userData);
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
                    <div className='employee_detail'>
                        <span className='employee_field'>Password</span>
                        <input type="password" id="pass" onChange={(p) => setEPass(p.target.value)} />
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
                    <div className='employee_detail'>
                    <span className='employee_field'>Role</span>
                        <div>
                            <select name="role" id="erole" onChange={(e) => setERole(e.target.value)}> 
                                <option value="customer">Customer</option> 
                                <option value="admin">Admin</option>
                            </select>    
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={()=>validateEntries()}>Add Data</button>
                </div>
            </div>
            <div>Already an user? <Link to="/">Login</Link></div>
        </div>
    )
}

export default CustomerDetails;
