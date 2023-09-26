import React from 'react';
import '../Styles/ApplyLoan.css'
import { useState, useEffect } from 'react';

import axios from 'axios'
import swal from 'sweetalert';
import NavbarCust from '../Components/NavbarCust';

const ApplyForLoan=()=>{

    const [token, setToken] =useState("init val");
    const [user, setUser] =useState({});
    const[category,setCategory] = useState("furniture");
    const[make,setMake] = useState("wood");
    const [desc,setDesc] = useState('')
    const [valuation,setValuation] = useState(0)
    let isDataValid=true;

    const baseURL = "https://localhost:7223/api/customer";
    useEffect(() => {
        const sessionToken=sessionStorage.getItem('token');
        const sessionUser=JSON.parse(sessionStorage.getItem('user'));
        setToken(sessionToken);
        setUser(sessionUser);
      }, []);


    const validateEntries=async (e)=>{
        e.preventDefault()
        if(desc.length===0){
            swal("Validation Failed","Please enter item description!","error");
            isDataValid=false;
        }
        if(valuation <= 0){
            swal("Validation Failed","Please enter a Item value greater than 0","error");
            isDataValid=false;
        }

        if(isDataValid===false){
            return;
        }

        const loanData = {
            employeeID:user.userId,
            itemDescription:desc,
            itemValue:valuation,
            itemMake:make,
            itemCategory:category
        }
         applyLoan(loanData)
        
    }

    const applyLoan = async(data) => {
        try{
            const resp = await axios.post(`${baseURL}/applyForLoan`,
            data,{
              headers:{
                  "Authorization":`Bearer ${token}`
              }
            })
            if(resp.status===200){
              swal("Application Success","Your Loan Application has been added","success")
            }
          }
          catch(err){
            swal("Application error","Sommething went wrong, Please try again","error")
            console.log(err)
          }
    }
    return (
        <div>
            <NavbarCust/>
            <div style={{padding:"10px"}}>
                <h2>Select Product and Apply for Loan</h2>
            </div>
            <div className='customer_details'>
                <div className='employee_details'>
                    <div className='employee_detail'>
                        <span className='employee_field'>Employee ID</span>
                        <input disabled type="text" id="eId" value={user.userId}/>
                    </div>
                    <div className='employee_detail'>
                        <span className='employee_field'>Item Description</span>
                        <input type="text" id="iDesc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Item Description'/>
                    </div>
                    <div className='employee_detail'>
                    <span className='employee_field'>Item Value</span>
                        <div><input type="number" id="iValue" value={valuation} onChange={(e) => setValuation(e.target.value)}/></div>
                    </div>
                </div>
                <div className='employee_details'>
                    <div className='employee_detail'>
                    <span className='employee_field'>Item Make</span>
                        <div>
                            <select name="iMake" id="iMake" value={make} onChange={(e) => setMake(e.target.value)}> 
                                <option value="glass">Glass</option> 
                                <option value="plastic">Plastic</option> 
                                <option value="wood">Wood</option> 
                            </select>
                        </div>
                    </div>
                    <div className='employee_detail'>
                    <span className='employee_field'>Item Category</span>
                        <div>
                            <select name="iCategory" id="iCategory" value={category} onChange={(e) => setCategory(e.target.value)}> 
                                <option value="crockery">Crockery</option> 
                                <option value="furniture">Furniture</option>
                                <option value="stationery">Stationery</option>
                            </select>    
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={(e)=>validateEntries(e)}>Add Data</button>
                </div>
            </div>
        </div>
    )
}

export default ApplyForLoan;