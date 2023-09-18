import React, { useEffect, useState } from "react";
import { useAuth } from '../Contexts/AuthContext'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TableComponent from "../Components/TableComponent";
export const CustomerLoanCards = () => {
  const navigate = useNavigate();
  const { logout, user, token } = useAuth();

  const [loanCards, setLoanCards] = useState([])


  const baseURL = "https://localhost:7223/api/customer"

  const getLoans = async () => {
    try {
      const resp = await axios.get(`${baseURL}/GetLoans?id=${user.userId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      setLoanCards(resp.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getLoans()
  }, [])

  console.log(loanCards)
  // const user = { emp_id: "E0002", designation: "Manager", department: "IT" };
  // const loanCards = [
  //   {
  //     loan_id: "L1001",
  //     loan_type: "Furniture",
  //     duration: 5,
  //     card_issue_date:"1/1/2000"
  //   },
  //   {
  //     loan_id: "L1002",
  //     loan_type: "Stationary",
  //     duration: 4,
  //     card_issue_date:"1/1/2001"
  //   },
  // ];
  return (
    <div>
      <h1>Loan Management Application</h1>
      <h2>Loan Cards Availed</h2>
      <TableComponent headerData={["Loan ID", "Loan Type", "Duration", "Card Issue Date"]} tableData={loanCards} />
      {/* <div
          style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
        >
          <span>Employee ID: {user?.emp_id}</span>
          <span>Designation: {user?.designation}</span>
          <span>Department: {user?.department}</span>
        </div> */}
      {/* <table>
          <thead>
            <tr>
              <th>loan_id</th>
              <th>Loan Type</th>
              <th>Duration</th>
              <th>Card Issue Date</th>
            </tr>
          </thead>
          <tbody>
            {
              loanCards.map((val,idx) => (
                <tr key={`loanCard${idx}`}>
                  <td>{val?.loanId}</td>
                  <td>{val?.loanType}</td>
                  <td>{val?.durationInYears}</td>
                  <td>{val?.cardIssueDate.substring(0,10)}</td>
                </tr>
              ))}
          </tbody>
        </table> */}
    </div>
  );
};
