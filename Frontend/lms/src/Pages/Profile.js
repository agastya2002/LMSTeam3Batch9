import React from 'react';
import '../Styles/CustomerDetails.css'
import { useState } from 'react';

const Profile=()=>{

    const logout=()=>{
        
    }
    return (
        <div>
            <div>
                <h1>Loan Management Application</h1>
                <h2>Login</h2>
            </div>
            <div>
                    <button type="submit" onClick={()=>logout()}>Logout</button>
                </div>
        </div>
    )
}

export default Profile;
