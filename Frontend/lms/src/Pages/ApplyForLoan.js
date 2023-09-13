import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ApplyForLoan=()=>{

    const navigate = useNavigate();
    const {user, applyForLoan}  = useAuth();
    const [eID,setEID]=useState("E0001");
    const [iDesc,setIDesc]=useState("Table");
    const [iMake,setIMake]=useState("Wooden");
    const [iCategory,setICategory]=useState("Furniture");
    const [iValue,setIValue]=useState(1000);
    let isDataValid=true;

    // Example JSON object for applying for loan
    // {
    //     "employeeId": "E0006",
    //     "iDesc": "Table",
    //     "iMake": "Wooden",
    //     "iCategory": "Furniture",
    //     "iValue": 1000
    //   }

    const validateEntries=async ()=>{
        //check employee ID
        if (!eID.match(/[A-Z]{1}[0-9]/)){
            alert("Invalid employee ID format!");
            isDataValid=false;
        }
        if(iDesc.length===0){
            alert("Please enter item description!");
            isDataValid=false;
        }
        if(iValue <= 0){
            alert("Item value should be > 0");
            isDataValid=false;
        }

        if(isDataValid===false){
            return;
        }

        const loanData = {
            EmployeeId: eID,
            iDesc: iDesc,
            iMake:iMake,
            iCategory:iCategory,
            iValue:iValue
        }
        // const res = applyForLoan(loanData);
        // if(res) {
        //     while(!user) {}
        //     if(user) {
        //         navigate("/ViewLoan")
        //     }
        // }
        
    }
    return (
        <div>
            <div>
                <h1>Loan Management Application</h1>
                <h2>Select Product and Apply for Loan</h2>
            </div>
            <div className='customer_details'>
                <div className='employee_details'>
                    <div className='employee_detail'>
                        <span className='employee_field'>Employee id</span>
                        <input type="text" id="eid" value={eID} onChange={(e) => setEID(e.target.value)} />
                    </div>
                    <div className='employee_detail'>
                        <span className='employee_field'>Item Description</span>
                        <input type="text" id="iDesc" value={iDesc} onChange={(e) => setIDesc(e.target.value)}/>
                    </div>
                </div>
                <div className='employee_details'>
                    <div className='employee_detail'>
                    <span className='employee_field'>Item Make</span>
                        <div>
                            <select name="iMake" id="iMake" value={iMake} onChange={(e) => setIMake(e.target.value)}> 
                                <option value="glass">Glass</option> 
                                <option value="plastic">Plastic</option> 
                                <option value="wood">Wood</option> 
                            </select>
                        </div>
                    </div>
                    <div className='employee_detail'>
                    <span className='employee_field'>Item Category</span>
                        <div>
                            <select name="iCategory" id="iCategory" value={iCategory} onChange={(e) => setICategory(e.target.value)}> 
                                <option value="crockery">Crockery</option> 
                                <option value="furniture">Furniture</option>
                                <option value="stationery">Stationery</option>
                            </select>    
                        </div>
                    </div>
                </div>
                <div className='employee_details'>
                    <div className='employee_detail'>
                    <span className='employee_field'>Item Value</span>
                        <div><input type="number" id="iValue" value={iValue} onChange={(e) => setIValue(e.target.value)}/></div>
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={()=>validateEntries()}>Add Data</button>
                </div>
            </div>
        </div>
    )
}

export default ApplyForLoan;