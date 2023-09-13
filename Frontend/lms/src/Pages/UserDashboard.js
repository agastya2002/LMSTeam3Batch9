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
            <h2>User Dashboard</h2>
            <div>
                <Link to = "/ViewLoan">
                <button>View Loans</button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to = "/ApplyLoan">
                <button>Apply For Loan</button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/ViewItem">
                <button>View Items Purchased</button>
                </Link>
            </div>
        </div>
    )
}

export default UserDashboard;