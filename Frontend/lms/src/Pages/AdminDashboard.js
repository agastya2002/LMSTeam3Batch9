import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext'
import DashboardCard from '../Components/DashboardCard';
import { Col, Container, Row } from 'react-bootstrap';
import { BasketFill } from 'react-bootstrap-icons'; 

const UserDashboard = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();


    const userLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <div style={{height:'80vh'}}>
            <h1>Loan Management Application</h1>
            <h2>Admin Dashboard</h2>
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
                    <Link to="/CustomerDataManagement" style={{textDecoration:"none"}}>
                    <DashboardCard title="Customer Data Management" icon="Person"/>
                    </Link>

                    </Col>
                    <Col>
                    <Link to="/AdminLoanDataEdit" style={{textDecoration:"none"}}>
                    <DashboardCard title="Loan Card Management" icon="Loans"/>
                    </Link>

                    </Col>
                    <Col>
                    <Link to="/AdminItemsMaster" style={{textDecoration:"none"}}>
                    <DashboardCard title="Items Data Management" icon="Getitems" />
                    </Link>

                    </Col>
                </Row>
                </Container>
            <button type="submit" onClick={() => userLogout()}>Logout</button>
        </div>
    )
}

export default UserDashboard;