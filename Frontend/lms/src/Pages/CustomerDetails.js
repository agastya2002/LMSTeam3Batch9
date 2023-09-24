import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const CustomerDetails=()=>{

    const navigate = useNavigate();
    // const {user, register}  = useAuth();
    const {register}  = useAuth();
    const [user, setUser] =useState({});

    const [eID,setEID]=useState("E0001");
    const [ePass, setEPass] = useState("****");
    const [eName,setEName]=useState("John Doe");
    const [eRole,setERole]=useState('customer');
    const [department,setDepartment]=useState("it");
    const [gender,setGender]=useState("M");
    const [designation,setDesignation]=useState("manager");
    const [dob,setDob]=useState("");
    const [doj,setDoj]=useState("");
    let isDataValid=true;

    useEffect(() => {
        const sessionUser=JSON.parse(sessionStorage.getItem('user'));
        setUser(sessionUser);
      }, []);

    // Example JSON object for registering employee
    // {
    //     "employeeName": "John Doe",
    //     "designation": "Manager",
    //     "department": "IT",
    //     "gender": "M",
    //     "dateOfBirth": "2023-09-11T03:49:32.942Z",
    //     "dateOfJoining": "2023-09-11T03:49:32.942Z",
    //     "employee": {
    //       "employeePassword": "25efd29860a4f83a7c971bdcfb3eb771c95dab9356b7dec0aa165eb80bfd817f",
    //       "employeeRole": "customer"
    //     }
    //   }

    const validateEntries=async ()=>{
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
        if(eRole.length===0){
            alert("Please mention the role of employee");
            isDataValid = false;
        }

        if(isDataValid===false){
            return;
        }

        const userData = {
            EmployeeName: eName,
            Designation:designation,
            Department:department,
            Gender:gender,
            DateOfBirth: dob,
            DateOfJoining: doj,
            Employee: {
                EmployeePassword: ePass,
                EmployeeRole: eRole
            }
        }
        const res = register(userData);
        if(res) {
            while(!user) {}
            if(user) {
                navigate("/profile")
            }
        }
        
    }
    return (
        <div>
            {/* <div>
                <h1>Loan Management Application</h1>
                <h2>Customer Master Data Details</h2>
            </div> */}
            <div className='customer_details'>
                <div className='employee_details'>
                    <div className='employee_detail'>
                        <span className='employee_field'>Employee Name</span>
                        <input type="text" id="ename" value={eName} onChange={(e) => setEName(e.target.value)}/>
                    </div>
                    <div className='employee_detail'>
                        <span className='employee_field'>Password</span>
                        <input type="password" id="pass" value={ePass} onChange={(p) => setEPass(p.target.value)} />
                    </div>
                </div>
                <div className='employee_details'>
                    <div className='employee_detail'>
                    <span className='employee_field'>Department</span>
                        <div>
                            <select name="department" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}> 
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
                            <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}> 
                                <option value="M">Male</option> 
                                <option value="F">Female</option>
                            </select>    
                        </div>
                    </div>
                    <div className='employee_detail'>
                        <span className='employee_field'>Designation</span>
                        <div>
                            <select name="designation" id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)}> 
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
                        <div><input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}/></div>
                    </div>
                    <div className='employee_detail'>
                    <span className='employee_field'>Date Of Joining</span>
                        <div><input type="date" id="doj" value={doj} onChange={(e) => setDoj(e.target.value)} /></div>
                    </div>
                    <div className='employee_detail'>
                    <span className='employee_field'>Role</span>
                        <div>
                            <select name="erole" id="erole" value={eRole} onChange={(e) => setERole(e.target.value)}> 
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