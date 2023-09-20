import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import { useAuth } from '../Contexts/AuthContext';
import axios from "axios";

export const AdminItemMaster = () => {

  const [items,setItems] = useState([])
 

  useEffect(()=>{
    getItems()
  },[])

  const baseURL = "https://localhost:7223/api/admin"
  const { token} = useAuth();

  const getItems = async() => {
    try{
      const resp = await axios.get(`${baseURL}/GetItems`,{
          headers:{"Authorization":`Bearer ${token}`}
      })
      console.log(resp)
      setItems(resp.data)
    }catch(err){
      console.log(err)
    }
  }

  const editItems = (e) => {
  
    //editLoan code here
  }
  const deleteItem=async(val)=>{
    console.log(val)
    try{
        const resp = await axios.delete(`${baseURL}/DeleteItemById?id=${val.itemId}`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        console.log(resp)
        if(resp.status==200){
            const editedItems = items.filter(item => item.itemId !== val.itemId);
            setItems(editedItems);
        }
      }catch(err){
        console.log(err)
      }
  }

  return (
    <div>
      <h1>Loan Management Application</h1>
      <h2>Item Master Data Details</h2>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >

       
      </div>
      <TableComponent headerData={["Item ID", "Issue Status", "Item Description","Item Make","Item Category","Valuation"]} tableData={responseFilter(items,["itemId","issueStatus","itemDescription","itemMake","itemCategory","itemValuation"])} tableActions={[{ actionName: "Edit", actionCallback: (e) => editItems(e) }, { actionName: "Delete", actionCallback: (val) => deleteItem(val) }]} />
      
          
              
    </div>
  );
};


export default AdminItemMaster;