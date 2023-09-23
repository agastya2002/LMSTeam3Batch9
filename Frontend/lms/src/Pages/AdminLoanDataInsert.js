import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import { useAuth } from '../Contexts/AuthContext';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import swal from "sweetalert";

export const AdminLoanDataInsert = () => {

    const [employeeId, setEmployeeId] = useState('')
    const [loanId, setLoanId] = useState('')
    const [loanType, setLoanType] = useState("furniture");
    const [duration, setDuration] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            EmployeeId: employeeId,
            LoanId: loanId,
            LoanType: loanType,
            DurationInYears: Number(duration)
        };

        try {
            const resp = await axios.post(`${baseURL}/AddLoanCard`, data, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            if(resp.status==200){
                swal("Loan Card Added",`Loan Card with Id ${resp.data} has been added successfully`,"success")
            }
        } catch (err) {
            swal("Failed to Add","Something Unexpected occured.Please try again!","error")
            console.log(err)
        }

    }
    const baseURL = "https://localhost:7223/api/admin"
    // const { token } = useAuth();
    const [token, setToken] =useState("init val");

    useEffect(() => {
        const sessionToken=sessionStorage.getItem('token');
        setToken(sessionToken);
      }, []);

    return (
        <div>
            <h1>Loan Management Application</h1>
            <h2>Loan Card Data Insert</h2>


            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <label>Employee Id
                    <input type="text" name="employeeId" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}></input>
                </label>
                <label>Loan Id
                    <input disabled type="text" name="loanId" value={loanId} onChange={(e) => setLoanId(e.target.value)}></input>
                </label>
                <label>Loan Type
                    <select value={loanType} onChange={(e) => setLoanType(e.target.value)}>
                        <option value="furniture">Furniture</option>
                        <option value="crockery">Crockery</option>
                        <option value="stationery">Stationery</option>
                    </select>
                </label>
                <label>Duration
                    <input type="text" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)}></input>
                </label>
                {showSuccessMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                <button onClick={(e) => handleSubmit(e)}>Add Data</button>
                <Link to="/AdminLoanDataEdit">
                    <button>Loan Card Management</button>
                </Link>
            </form>
        </div>
    );
};


export default AdminLoanDataInsert;