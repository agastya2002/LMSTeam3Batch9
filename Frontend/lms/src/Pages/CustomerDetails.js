import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import NavbarAdmin from "../Components/NavbarAdmin";
import { sha256 } from 'js-sha256';
import swal from 'sweetalert';

const CustomerDetails=()=>{

    const {addEmployee}  = useAuth();
    const [user, setUser] =useState({});

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

   

    const validateEntries=async ()=>{
        if(eName.length===0){
            swal("Validation Failed","Please enter employee name!","error");
            isDataValid=false;
        }
        if(ePass.length===0){
            swal("Validation Failed","Please enter password","error");
            isDataValid=false;
        }
        if(!eName.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)){
            swal("Validation Failed","Employee name is invalid!\nUse of special characters and numbers is not allowed","Error")
            isDataValid=false;
        }
        if(dob.length===0){
            swal("Validation Failed","Please enter date of birth","error");
            isDataValid=false;
        }
        if(doj.length===0){
            swal("Validation Failed","Please enter date of joining","error");
            isDataValid=false;
        }
        if(doj<=dob){
            swal("Validation Failed","Please ensure date of joining is after date of birth","error");
            isDataValid=false;
        }
        if(eRole.length===0){
            swal("Validation failed","Please mention the role of employee","error");
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
                EmployeePassword: sha256(ePass),
                EmployeeRole: eRole
            }
        }
        addEmployee(userData);
       
        
    }
    return (
        <div>
            
            <NavbarAdmin />
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
        </div>
    )
}

export default CustomerDetails;