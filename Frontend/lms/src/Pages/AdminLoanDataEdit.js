import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import { useAuth } from '../Contexts/AuthContext';
import axios from "axios";
import { Link } from 'react-router-dom';

export const AdminLoanDataEdit = () => {

  const [loanCards, setLoanCards] = useState([])
  const [loanId, setLoanId] = useState('')
  const [loanType, setLoanType] = useState("Furniture");
  const [duration, setDuration] = useState('');
  const [edit, setEdit] = useState(false);


  // const user = { emp_id: "E0002", designation: "Manager", department: "IT" };
  // const loanCards = [
  //   {
  //     loan_id: "L1001",
  //     loan_type: "Furniture",
  //     duration: 5
  //   },
  //   {
  //     loan_id: "L1002",
  //     loan_type: "Stationery",
  //     duration: 1
  //   },
  //   {
  //     loan_id: "L1003",
  //     loan_type: "Crockery",
  //     duration: 2
  //   },
  // ];
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
      if (resp.status == 200) {
        const edittedLoanCards = loanCards.filter(l => l.loanId != data.loanId)
        setLoanCards([...edittedLoanCards, { loanId: data.loanId, loanType: data.loanType, durationInYears: data.durationInYears }])
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getLoanCards()
  }, [])

  const baseURL = "https://localhost:7223/api/admin"
  const { token } = useAuth();

  const getLoanCards = async () => {
    try {
      const resp = await axios.get(`${baseURL}/GetLoans`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      console.log(resp)
      setLoanCards(resp.data)
    } catch (err) {
      console.log(err)
    }
  }

  const editLoan = (val) => {
    const loanDetails = val;
    console.log(loanDetails);
    setLoanId(val.loanId);
    setLoanType(val.loanType);
    setDuration(val.durationInYears);
    setEdit(true);
  };

  const deleteLoan = async (val) => {
    const loanDetails = val;
    console.log(loanDetails);
    try {
      const resp = await axios.delete(`${baseURL}/DeleteLoanById?id=${val.loanId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      console.log(resp)
      if (resp.status == 200) {
        const edittedLoanCards = loanCards.filter(loanCard => loanCard.loanId !== val.loanId);
        setLoanCards(edittedLoanCards);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Loan Management Application</h1>
      <h2>Loan Card Details</h2>
      {
        edit ?
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
          : null
      }
      <div
        style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >

        {/* <span>Employee ID: {user?.emp_id}</span>
          <span>Designation: {user?.designation}</span>
          <span>Department: {user?.department}</span> */}
      </div>
      <TableComponent headerData={["Loan ID", "Loan Type", "Duration"]} tableData={responseFilter(loanCards, ["loanId", "loanType", "durationInYears"])} tableActions={[{ actionName: "Edit", actionCallback: (e) => editLoan(e) }, { actionName: "Delete", actionCallback: (e) => deleteLoan(e) }]} />

      <Link to="/AdminLoanDataInsert">
        <button>Add Loan Card</button>
      </Link>
      {/*         <table>
          <thead>
            <tr>
              <th>loan_id</th>
              <th>Loan Type</th>
              <th>Duration</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              loanCards.map((val,idx) => (
                <tr key={`loanCard${idx}`}>
                  <td>{val?.loan_id}</td>
                  <td>{val?.loan_type}</td>
                  <td>{val?.duration}</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              ))}
          </tbody>
        </table> */}
    </div>
  );
};


export default AdminLoanDataEdit;