import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink,useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext'

function NavbarCust() {

  const navigate = useNavigate();
  const { logout,user } = useAuth();


  const userLogout = () => {
      logout();
      navigate("/");
  }

  return (
    <Navbar bg="light" expand="lg" style={{padding:"15px"}}>
      <Navbar.Brand style={{paddingX:"15px"}}>LMS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'90vw'}}>
          <div style={{display:'flex',columnGap:'20px'}}>
          <NavLink style={{textDecoration:"none"}} to="/UserDashboard">Dashboard</NavLink>
          <NavLink style={{textDecoration:"none"}} to="/ViewItem">View Items</NavLink>
          <NavLink style={{textDecoration:"none"}} to="/ApplyLoan">Apply Loan</NavLink>
          <NavLink style={{textDecoration:"none"}} to="/ViewLoan">View Loans</NavLink>
          </div>
          <div style={{display:'flex',columnGap:'20px',alignItems:"center"}}>
           <span> EID : {user.userId}</span>
          <Button variant="outline-danger" onClick={() => userLogout()}>Logout</Button>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarCust;
