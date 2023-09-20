import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import responseFilter from "../Helpers/responseFilter";
import { useAuth } from '../Contexts/AuthContext';
import axios from "axios";

export const AdminItemMaster = () => {

  const [items,setItems] = useState([])
  const[inputs,setInputs] = useState({});
    const[category,setCategory] = useState("Furniture");
    const[status,setStatus] = useState("Y");
    const[make,setMake] = useState("Wood");
    const [itemId,setItemId] = useState('')
    const [desc,setDesc] = useState('')
    const [valuation,setValuation] = useState('')
    const [edit,setEdit] = useState(false)

    const handleCategoryChange = (event)=>{
        setCategory(event.target.value)
    }

    const handleItemStatus = (event)=>{
        setStatus(event.target.value);
    }

    const handleItemMake = (event)=>{
        setMake(event.target.value);
    }

    const handleSubmit = ()=>{
       console.log("HI")
        
    }

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

  const editItems = (val) => {
    setItemId(val.itemId)
    setDesc(val.itemDescription)
    setCategory(val.itemCategory)
    setMake(val.itemMake)
    setValuation(val.itemValuation)
    setStatus(val.issueStatus)
    setEdit(true)
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
      {
        edit?
        <form style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'15px'}}>
        <label>Item Id
        <input type = "text" name = "itemId" value = {itemId} onChange = {(e)=>setItemId(e.target.value)}></input>
        </label>
        <label>Item Category
        <select value = {category} onChange = {handleCategoryChange}>
            <option value = "Furniture">Furniture</option>
            <option value = "Crockery">Crockery</option>
            <option value = "Stationery">Stationery</option>
        </select>
        </label>
        <label>Item Description
        <input type = "text" name = "itemDescription" value = {desc} onChange = {(e)=>setDesc(e.target.value)}></input>
        </label>
        <label>Item Value
        <input type = "text" name = "itemValue" value = {valuation} onChange = {(e)=>setValuation(e.target.value)}></input>
        </label>
        <label>Issue Status
        <select value = {status} onChange = {handleItemStatus}>
            <option value = "Y">Yes</option>
            <option value = "N">No</option>
        </select>
        </label>
        <label>Item Make
        <select value = {make} onChange = {handleItemMake}>
            <option value = "Wood">Wood</option>
            <option value = "Glass">Glass</option>
            <option value = "Plastic">Plastic</option>
        </select>
        </label>
        <button onClick={(e)=>handleSubmit(e)}>Add Data</button>
        <button onClick={()=>setEdit(false)}>Cancel</button>
    </form>
        :null
      }
      <TableComponent headerData={["Item ID", "Issue Status", "Item Description","Item Make","Item Category","Valuation"]} tableData={responseFilter(items,["itemId","issueStatus","itemDescription","itemMake","itemCategory","itemValuation"])} tableActions={[{ actionName: "Edit", actionCallback: (e) => editItems(e) }, { actionName: "Delete", actionCallback: (val) => deleteItem(val) }]} />
      
          
              
    </div>
  );
};


export default AdminItemMaster;