import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import { useAuth } from '../Contexts/AuthContext';
import axios from "axios";

export const AdminLoanDataInsert = () => {

    const [loanId, setLoanId] = useState('')
    const [loanType, setLoanType] = useState("Furniture");
    const [duration, setDuration] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            loanId: loanId,
            loanType: loanType,
            durationInYears: duration
        };

        try {
            const resp = await axios.put(`${baseURL}/UpdateLoan`, data, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            console.log(resp)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getLoanCards()
    }, [])

    const baseURL = "https://localhost:7223/api/admin"
    const { token } = useAuth();

    return (
        <div>
            <h1>Loan Management Application</h1>
            <h2>Loan Card Data Insert</h2>


            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <label>Loan Id
                    <input type="text" name="loanId" value={loanId} onChange={(e) => setLoanId(e.target.value)}></input>
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
                <button onClick={(e) => handleSubmit(e)}>Edit Data</button>
                <button onClick={() => setEdit(false)}>Cancel</button>
            </form>
        </div>
    );
};


export default AdminLoanDataInsert;