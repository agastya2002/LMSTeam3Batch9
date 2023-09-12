import React from "react";

export const CustomerItemsPurchased = () => {
    const user = { emp_id: "E0002", designation: "Manager", department: "IT" };
    const items = [
      {
        issue_id: "I1001",
        item_description: "Tea Table",
        item_make: "Wooden",
        item_category: "Furniture",
        item_valuation: "5000",
      },
      {
        issue_id: "I1002",
        item_description: "Tea Set",
        item_make: "Glass",
        item_category: "Crockery",
        item_valuation: "2000",
      },
    ];
    return (
      <div>
        <h1>Loan Management Application</h1>
        <h2>Items Purchased</h2>
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
              <th>Issue_Id</th>
              <th>Item Description</th>
              <th>Item Make</th>
              <th>Item Category</th>
              <th>Item Valuation</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((val,idx) => (
                <tr key={`item${idx}`}>
                  <td>{val?.issue_id}</td>
                  <td>{val?.item_description}</td>
                  <td>{val?.item_make}</td>
                  <td>{val?.item_category}</td>
                  <td>{val?.item_valuation}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
};
