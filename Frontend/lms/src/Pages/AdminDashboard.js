import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useAuth} from '../Contexts/AuthContext'

const UserDashboard =()=>{

    return (
        <div>
            <h1>Loan Management Application</h1>
            <h2>Admin Dashboard</h2>
            <div>
                <Link to = "/CustomerDataManagement">
                <button>Customer Data Management</button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to = "/LoanCardManagement">
                <button>Loan Card Management</button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/ItemMasterData">
                <button>Items Master Data</button>
                </Link>
            </div>
        </div>
    )
}

export default UserDashboard;