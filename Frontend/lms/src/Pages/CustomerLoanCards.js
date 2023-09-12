import React from "react";

export const CustomerLoanCards = () => {
    const user = { emp_id: "E0002", designation: "Manager", department: "IT" };
    const loanCards = [
      {
        loan_id: "L1001",
        loan_type: "Furniture",
        duration: 5,
        card_issue_date:"1/1/2000"
      },
      {
        loan_id: "L1002",
        loan_type: "Stationary",
        duration: 4,
        card_issue_date:"1/1/2001"
      },
    ];
    return (
      <div>
        <h1>Loan Management Application</h1>
        <h2>Loan Cards Availed</h2>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
        >
          <span>Employee ID: {user?.emp_id}</span>
          <span>Designation: {user?.designation}</span>
          <span>Department: {user?.department}</span>
        </div>
        <table>
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
                  <td>{val?.loan_id}</td>
                  <td>{val?.loan_type}</td>
                  <td>{val?.duration}</td>
                  <td>{val?.card_issue_date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
};
