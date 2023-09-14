import React, { useEffect, useState } from "react";
import {useAuth} from '../Contexts/AuthContext'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const CustomerItemsPurchased = () => {

    const navigate = useNavigate();
    const {logout, user, token} = useAuth();

    const [items,setItems] = useState([])

    
    const baseURL = "https://localhost:7223/api/customer"

    const getItems = async () => {
        try{
        const resp = await axios.get(`${baseURL}/GetPurchasedItems?id=${user.userId}`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        setItems(resp.data)
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
      getItems()
    },[])
    // const items = [
    //   {
    //     issue_id: "I1001",
    //     item_description: "Tea Table",
    //     item_make: "Wooden",
    //     item_category: "Furniture",
    //     item_valuation: "5000",
    //   },
    //   {
    //     issue_id: "I1002",
    //     item_description: "Tea Set",
    //     item_make: "Glass",
    //     item_category: "Crockery",
    //     item_valuation: "2000",
    //   },
    // ];
    console.log(items)
    return (
      <div>
        <h1>Loan Management Application</h1>
        <h2>Items Purchased</h2>
        {/* <div
          style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
        >
          <span>Employee ID: {user?.emp_id}</span>
          <span>Designation: {user?.designation}</span>
          <span>Department: {user?.department}</span>
        </div> */}
        {
          items.length!=0?<table>
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
                  <td>{val?.itemId}</td>
                  <td>{val?.itemDescription}</td>
                  <td>{val?.itemMake}</td>
                  <td>{val?.itemCategory}</td>
                  <td>{val?.itemValuation}</td>
                </tr>
              ))}
          </tbody>
        </table>:null
        }
        
      </div>
    );
};
