import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useAuth} from '../Contexts/AuthContext'

const ItemMaster =()=>{
    const[inputs,setInputs] = useState({});
    const[category,setCategory] = useState("Furniture");
    const[status,setStatus] = useState("Y");
    const[make,setMake] = useState("Wood");

    const handleCategoryChange = (event)=>{
        setCategory(event.target.value)
    }

    const handleItemStatus = (event)=>{
        setStatus(event.target.value);
    }

    const handleItemMake = (event)=>{
        setMake(event.target.value);
    }

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        alert(inputs);
    }

    const handleAdd = () => {}

    return(
        <div>
            <h1>Loan Management Application</h1>
            <h2>Item Master Data Details</h2>
            <form onSubmit = {handleAdd}>
                <label>Item Id:
                <input type = "text" name = "itemId" value = {inputs.itemId} onChange = {handleChange}></input>
                </label>
                <label>Item Category:
                <select value = {category} onChange = {handleCategoryChange}>
                    <option value = "Furniture">Furniture</option>
                    <option value = "Crockery">Crockery</option>
                    <option value = "Stationery">Stationery</option>
                </select>
                </label>
                <label>Item Description:
                <input type = "text" name = "itemDescription" value = {inputs.itemDescription} onChange = {handleChange}></input>
                </label>
                <label>Item Value:
                <input type = "text" name = "itemValue" value = {inputs.itemValue} onChange = {handleChange}></input>
                </label>
                <label>Issue Status:
                <select value = {status} onChange = {handleItemStatus}>
                    <option value = "Y">Yes</option>
                    <option value = "N">No</option>
                </select>
                </label>
                <label>Item Make:
                <select value = {make} onChange = {handleItemMake}>
                    <option value = "Wood">Wood</option>
                    <option value = "Glass">Glass</option>
                    <option value = "Plastic">Plastic</option>
                </select>
                </label>
                <input type = "submit">Add Data</input>
            </form>
        </div>
    )
}

export default ItemMaster;