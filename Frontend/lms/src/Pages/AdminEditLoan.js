import React, { useCallback } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
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
  const editLoan = (e) => {
    const loanDetails=e;
    console.log(loanDetails);
    //editLoan code here
  }
  const deleteLoan = (e) => {
    const loanDetails=e;
    console.log(loanDetails);
    //editLoan code here
  }
  return (
    <div>
      <h1>Loan Management Application</h1>
      <h2>Customer Master Data Details</h2>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >

        {/* <span>Employee ID: {user?.emp_id}</span>
          <span>Designation: {user?.designation}</span>
          <span>Department: {user?.department}</span> */}
      </div>
      <TableComponent headerData={["Loan ID", "Loan Type", "Duration"]} tableData={responseFilter(loanCards,["loan_id","loan_type","duration"])} tableActions={[{ actionName: "Edit", actionCallback: (e) => editLoan(e) }, { actionName: "Delete", actionCallback: (e) => deleteLoan(e) }]} />
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


export default AdminEditLoan;