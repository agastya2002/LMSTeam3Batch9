import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TableComponent from '../Components/TableComponent';

const CustomerDataManagement=()=>{

    const navigate = useNavigate();

    const [eID,setEID]=useState("");
    const [eName,setEName]=useState("");
    const [department,setDepartment]=useState("it");
    const [gender,setGender]=useState("M");
    const [designation,setDesignation]=useState("manager");
    const [dob,setDob]=useState("");
    const [doj,setDoj]=useState("");
    const [emps,setEmps] = useState('')
    const [edit,setEdit] = useState(false)
    let isDataValid=true;

    const baseURL = "https://localhost:7223/api/admin"
    const {logout, user, token,register} = useAuth();


    console.log(emps)

    const getEmployees = async () => {
        try{
        const resp = await axios.get(`${baseURL}/GetEmployees`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        setEmps(resp.data)
      }catch(err){
        console.log(err)
      }
    }

    const updateEmployee = async (data) => {
        try{
        const resp = await axios.put(`${baseURL}/UpdateEmployee`,data,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        if(resp.status == 200){
            const editedEmps = emps.filter(e => e.employeeId !== data.EmployeeId)
            setEmps([...editedEmps,{employeeId:data.EmployeeId,employeeName:data.EmployeeName,department:data.Department,gender:data.Gender,designation:data.Designation,dateOfBirth:data.DateOfBirth,dateOfJoining:data.DateOfJoining}])
        }
      }catch(err){
        console.log(err)
      }
    }


    useEffect(()=>{
        getEmployees()
    },[])

    const validateEntries=async ()=>{
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
   

        if(isDataValid===false){
            return;
        }

        const userData = {
            EmployeeName: eName,
            EmployeeId:eID,
            Designation:designation,
            Department:department,
            Gender:gender,
            DateOfBirth: dob,
            DateOfJoining: doj,
        }
        
        updateEmployee(userData);       
    }


const editEmployee = (e) => {

    e.preventDefault();
    const val=JSON.parse(e.currentTarget.dataset.entryObj);
    console.log(val)
    setEID(val.employeeId)
    setEName(val.employeeName)
    setGender(val.gender)
    setDepartment(val.department)
    setDesignation(val.designation)
    setDob(val.dateOfBirth.substring(0,10))
    setDoj(val.dateOfJoining.substring(0,10))
    setEdit(true)
}

const deleteEmployee=(e)=>{
    const {entryId}=e.currentTarget.dataset;
}
const handleCancel = () =>{
    setEID("")
    setEName("")
    setGender("M")
    setDepartment("it")
    setDesignation("manager")
    setDob("")
    setDoj("")
    setEdit(false)
}

    return (
        <div>
            <div>
                <h1>Loan Management Application</h1>
                <h2>Customer Data Management</h2>
            </div>
            {
                edit?
            <div className='customer_details'>
                <div className='employee_details'>
                    <div className='employee_detail'>
                        <span className='employee_field'>Employee Name</span>
                        <input type="text" id="ename" value={eName} onChange={(e) => setEName(e.target.value)}/>
                    </div>
                    <div className='employee_detail'>
                        <span className='employee_field'>Employee Id</span>
                        <input type="text" id="eId" value={eID} disabled={true}/>
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
                </div>
                <div>
                    <button onClick={validateEntries}>Edit Data</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
              :null
            }
            <TableComponent headerData={["Employee ID", "Employee Name", "Gender","Designation","Department","Date of Birth","Date of joining"]} tableData={emps} tableActions={[{ actionName: "Edit", actionCallback: (e) => editEmployee(e) }, { actionName: "Delete", actionCallback: (e) => deleteEmployee(e) }]} />
             {/* {
          emps.length!=0?<table>
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>Employee Name</th>
              <th>Gender</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Date of Birth</th>
              <th>Date of joining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              emps.map((val,idx) => (
                <tr key={`emps${idx}`}>
                  <td>{val?.employeeId}</td>
                  <td>{val?.employeeName}</td>
                  <td>{val?.gender}</td>
                  <td>{val?.designation}</td>
                  <td>{val?.department}</td>
                  <td>{val?.dateOfBirth.substring(0,10)}</td>
                  <td>{val?.dateOfJoining.substring(0,10)}</td>
                  <td><div><button onClick={(e)=>editEmployee(e,val)}>Edit</button> <button>Delete</button></div></td>
                </tr>
              ))}
          </tbody>
        </table>:null
        } */}
        </div>
    )
}

export default CustomerDataManagement;