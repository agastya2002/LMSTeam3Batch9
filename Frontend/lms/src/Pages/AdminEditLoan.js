import React from "react";

export const AdminEditLoan = () => {
    // const user = { emp_id: "E0002", designation: "Manager", department: "IT" };
    const loanCards = [
      {
        loan_id: "L1001",
        loan_type: "Furniture",
        duration: 5
      },
      {
        loan_id: "L1002",
        loan_type: "Stationery",
        duration: 1
      },
      {
        loan_id: "L1003",
        loan_type: "Crockery",
        duration: 2
      },
    ];
    return (
      <div>
        <h1>Loan Management Application</h1>
        <h2>Customer Master Data Details</h2>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "space-between"}}
        >
          {/* <span>Employee ID: {user?.emp_id}</span>
          <span>Designation: {user?.designation}</span>
          <span>Department: {user?.department}</span> */}
        </div>
        <table>
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
        </table>
      </div>
    );
};


export default AdminEditLoan;