import React, { useEffect, useState } from "react";
import { useAuth } from '../Contexts/AuthContext'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import NavbarCust from "../Components/NavbarCust";
export const CustomerLoanCards = () => {
  const navigate = useNavigate();
  // const { logout, user, token } = useAuth();
  const { logout } = useAuth();

  const [loanCards, setLoanCards] = useState([])


  const baseURL = "https://localhost:7223/api/customer"
  

  const getLoans = async (token, user) => {
    try {
      const resp = await axios.get(`${baseURL}/GetLoans?id=${user.userId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      setLoanCards(resp?.data.map((o)=>({...o,['cardIssueDate']:o['cardIssueDate'].substring(0,10)})));
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const sessionToken=sessionStorage.getItem('token');
    const sessionUser=JSON.parse(sessionStorage.getItem('user'));
    getLoans(sessionToken, sessionUser);
  }, []);

  console.log(loanCards)

  return (
    <div>
      <NavbarCust/>
      <h2 style={{padding:"10px"}}>Loan Cards Availed</h2>
      <TableComponent headerData={["Loan ID", "Loan Type", "Duration (in years)", "Card Issue Date","Valuation"]} tableData={responseFilter(loanCards,["loanId","loanType","durationInYears","cardIssueDate","valuation"])} />
   
    </div>
  );
};
