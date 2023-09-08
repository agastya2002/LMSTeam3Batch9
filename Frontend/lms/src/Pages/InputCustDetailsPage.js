import React from 'react';

const InputCustDetailsPage=()=>{
    return (
        <div>
        <div>
            <h1>Loan Management Application</h1>
            <h2>Customer Master Data Details</h2>
        </div>

            <div>
                <div>Employee id:</div>
                <div><input type="text" id="eid" /></div>
            </div>
            <div>
                <div>Employee Name:</div>
                <div><input type="text" id="ename" /></div>
            </div>
            <div>
                <div>Department:</div>
                <div>
                    <select name="department" id="department"> 
                        <option value="it">IT</option> 
                        <option value="finance">Finance</option> 
                        <option value="sales">Sales</option> 
                        <option value="hr">HR</option> 
                    </select>
                </div>
            </div>
            <div>
                <div>Gender:</div>
                <div>
                    <select name="gender" id="gender"> 
                        <option value="male">Male</option> 
                        <option value="female">Female</option>
                    </select>    
                </div>
            </div>
            <div>
                <div>Designation:</div>
                <div>
                    <select name="designation" id="designation"> 
                        <option value="manager">Manager</option> 
                        <option value="ca">CA</option> 
                        <option value="dgm">DGM</option> 
                        <option value="associate">Associate</option> 
                    </select>
                </div>
            </div>
            <div>
                <div>Date of birth:</div>
                <div><input type="date" id="dob" /></div>
            </div>
            <div>
                <div>Date of joining:</div>
                <div><input type="date" id="doj" /></div>
            </div>
            <div>
                <button type="submit">Add Data</button>
            </div>
        </div>
    )
}

export default InputCustDetailsPage;
