import React from 'react';
import List from '../List/List';
import { useNavigate } from "react-router-dom";
import './dashboard.css';

const Dashboard = () => {
  
  const navigate = useNavigate();

  return (
    <div>
        <div className='top-row'>
            <h2>Users list</h2>
            <button className='btn orange' onClick={() => navigate('/addUser')} >Add new</button>
        </div>
        <List/>
    </div>
  )
}

export default Dashboard
