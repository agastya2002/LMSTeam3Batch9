import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useAuth} from '../Contexts/AuthContext'
import axios from 'axios';
import DashboardCard from '../Components/DashboardCard';
import { Col, Container, Row } from 'react-bootstrap';

const UserDashboard =()=>{

    const navigate = useNavigate();
    // const {logout, user, token} = useAuth();
    const {logout} = useAuth();

    const userLogout=()=>{
        logout();
        navigate("/");
    }

   
    return (
        <div style={{height:'80vh'}}>
            <h1>Loan Management Application</h1>
            <h2>User Dashboard</h2>
            <Container
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                <Row>
                    <Col>
                    <Link to="/ViewLoan" style={{textDecoration:"none"}}>
                    <DashboardCard title="View Loans" icon="Loans"/>
                    </Link>

                    </Col>
                    <Col>
                    <Link to="/ApplyLoan" style={{textDecoration:"none"}}>
                    <DashboardCard title="Apply for Loan"icon="Apply"/>
                    </Link>

                    </Col>
                    <Col>
                    <Link to="/ViewItem" style={{textDecoration:"none"}}>
                    <DashboardCard title="View Purchased Items" icon="Getitems"/>
                    </Link>

                    </Col>
                </Row>
                </Container>
            <button type="submit" onClick={() => userLogout()}>Logout</button>
        </div>
    )
}

export default UserDashboard;