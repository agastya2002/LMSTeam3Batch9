import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import { useAuth } from '../Contexts/AuthContext';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export const AdminLoanDataInsert = () => {

    const [loanId, setLoanId] = useState('')
    const [loanType, setLoanType] = useState("Furniture");
    const [duration, setDuration] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            LoanId: loanId,
            LoanType: loanType,
            DurationInYears: Number(duration)
        };

        try {
            const resp = await axios.post(`${baseURL}/AddLoanCard`, data, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            console.log(resp)
            setSuccessMessage(`Loan Card with Loan ID = ${resp.data} added successfully!`);
            setShowSuccessMessage(true);
        } catch (err) {
            console.log(err)
        }

    }
    const baseURL = "https://localhost:7223/api/admin"
    const { token } = useAuth();

    return (
        <div>
            <h1>Loan Management Application</h1>
            <h2>Loan Card Data Insert</h2>


            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <label>Loan Id
                    <input disabled type="text" name="loanId" value={loanId} onChange={(e) => setLoanId(e.target.value)}></input>
                </label>
                <label>Loan Type
                    <select value={loanType} onChange={(e) => setLoanType(e.target.value)}>
                        <option value="Furniture">Furniture</option>
                        <option value="Crockery">Crockery</option>
                        <option value="Stationery">Stationery</option>
                    </select>
                </label>
                <label>Duration
                    <input type="text" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)}></input>
                </label>
                {showSuccessMessage && <div class="alert alert-success" role="alert">{successMessage}</div>}
                <button onClick={(e) => handleSubmit(e)}>Add Data</button>
                <Link to="/AdminLoanDataEdit">
                    <button>Loan Card Management</button>
                </Link>
            </form>
        </div>
    );
};


export default AdminLoanDataInsert;