import React, { useState } from 'react';
const Dashboard = () => {
    const Logout = () => {
        localStorage.removeItem('token')
        alert('Token is delate')
        window.location.reload(); 

    }
    return (
        <div className='bg-dark d-grid justify-content-center align-items-center'style={{height:'100vh'}}>
            <h1 className='text-white'>Welcome to Dashboard</h1>
            <button className='btn btn-warning' onClick={()=>Logout()}>Log Out</button>
        </div>

    );
}

export default Dashboard;
