import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const ItemMaster =()=>{
    const[inputs,setInputs] = useState({});
    const[category,setCategory] = useState("Furniture");
    const[status,setStatus] = useState("Y");
    const[make,setMake] = useState("Wood");
    const [desc,setDesc] = useState('Item Description')
    const [valuation,setValuation] = useState('Item Valuation')

    const {user,token} = useAuth()

    const baseURL = "https://localhost:7223/api/customer"


    const handleCategoryChange = (event)=>{
        setCategory(event.target.value)
    }

    const handleItemStatus = (event)=>{
        setStatus(event.target.value);
    }

    const handleItemMake = (event)=>{
        setMake(event.target.value);
    }

    // const handleChange = (event)=>{
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values,[name]:value}))
    // }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const data = {
            EmployeeID:user.userId,
            ItemDescription:desc,
            ItemValuation:valuation,
            ItemMake:make,
            ItemCategory:category
        }

        try{
            const resp = await axios.post(`${baseURL}/ApplyForLoan`,data,{
                headers:{"Authorization":`Bearer ${token}`}
            })
            console.log(resp)          
          }catch(err){
            console.log(err)
          }

    }

    return(
        <div>
            <h1>Loan Management Application</h1>
            <h2>Item Master Data Details</h2>
            <form>
                <label>Item Category:
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
                {/* <label>Issue Status:
                <select value = {status} onChange = {handleItemStatus}>
                    <option value = "Y">Yes</option>
                    <option value = "N">No</option>
                </select>
                </label> */}
                <label>Item Make:
                <select value = {make} onChange = {handleItemMake}>
                    <option value = "Wood">Wood</option>
                    <option value = "Glass">Glass</option>
                    <option value = "Plastic">Plastic</option>
                </select>
                </label>
                <button onClick={(e)=>handleSubmit(e)}>Add Data</button>
            </form>
        </div>
    )
}

export default ItemMaster;