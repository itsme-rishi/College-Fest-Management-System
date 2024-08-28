import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
      <div>
        <h1>Welcome to organiser page</h1>
        <div>
          <Link to="/">Go back to Home</Link>
        </div>
        <div>
          <Link to="/Organiser/Register">Register</Link> 
        </div>
        <div>
          <Link to="/Organiser/Login">Login</Link>  
        </div>
      </div>
    );
  };

export default Admin;
