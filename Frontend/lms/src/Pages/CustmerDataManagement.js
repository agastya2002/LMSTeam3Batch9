import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TableComponent from '../Components/TableComponent';
import responseFilter from '../Helpers/responseFilter';
import swal from 'sweetalert';

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
    // const {logout, user, token,register} = useAuth();
    const {logout,register} = useAuth();
    const [token, setToken] =useState("init val");

    console.log(emps)

    const getEmployees = async (token) => {
        try{
        const resp = await axios.get(`${baseURL}/GetEmployees`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        setEmps(resp?.data.map((o)=>({...o,['dateOfBirth']:o['dateOfBirth'].substring(0,10),['dateOfJoining']:o['dateOfJoining'].substring(0,10)})));
      }catch(err){
        swal("Failed in Fetching Employeee Details","Some unexpected error occured, please try again","error")
        console.log(err)
      }
    }

    const updateEmployee = async (data) => {
        try{
        const resp = await axios.put(`${baseURL}/UpdateEmployee`,data,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        if(resp.status == 200){
            swal("Updated Successful","The Employee details has been edited succesfully","success")
            const editedEmps = emps.filter(e => e.employeeId !== data.EmployeeId)
            setEmps([...editedEmps,{employeeId:data.EmployeeId,employeeName:data.EmployeeName,department:data.Department,gender:data.Gender,designation:data.Designation,dateOfBirth:data.DateOfBirth,dateOfJoining:data.DateOfJoining}])
        }
      }catch(err){
        swal("Update not succesfull","Some unexpected error occured, please try again","error")
        console.log(err)
      }
    }

    useEffect(() => {
        const sessionToken=sessionStorage.getItem('token');
        setToken(sessionToken);
        getEmployees(sessionToken);
      }, []);

    const validateEntries=async ()=>{
        if(eName.length===0){
            swal("Validation Error","Please enter a name","error")
            isDataValid=false;
        }
        if(!eName.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g)){
            swal("Validation Error","Please enter a valid name","error")
            isDataValid=false;
        }
        if(dob.length===0){
            swal("Validation Error","Please provide the date of birth","error")
            isDataValid=false;
        }
        if(doj.length===0){
            swal("Validation Error","Please Provide the date of joining","error")
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


const editEmployee = (val) => {

    console.log(val)
    setEName(val.employeeName)
    setEID(val.employeeId)
    setGender(val.gender)
    setDepartment(val.department)
    setDesignation(val.designation)
    setDob(val.dateOfBirth.substring(0,10))
    setDoj(val.dateOfJoining.substring(0,10))
    setEdit(true)
}

const deleteEmployee=async(val)=>{
    console.log(val)
    try{
        const resp = await axios.delete(`${baseURL}/DeleteEmployee?id=${val.employeeId}`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        console.log(resp)
        if(resp.status==200){
            swal("Delete Successful","The Employee details has been deleted succesfully","success")
            const editedEmps = emps.filter(e => e.employeeId !== val.employeeId)
            setEmps(editedEmps)
        }
      }catch(err){
        swal("Delete not succesfull","Some unexpected error occured, please try again","error")
        console.log(err)
      }
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
            <TableComponent headerData={["Employee ID", "Employee Name", "Gender","Designation","Department","Date of Birth","Date of joining"]} tableData={responseFilter(emps,["employeeId","employeeName","gender","department","designation","dateOfBirth","dateOfJoining"])} tableActions={[{ actionName: "Edit", actionCallback: (e) => editEmployee(e) }, { actionName: "Delete", actionCallback: (val) => deleteEmployee(val) }]} />
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