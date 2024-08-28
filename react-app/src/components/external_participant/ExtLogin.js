

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ExtStyles from '../../css/ext.login.module.css';

const ExtLogin = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });



    useEffect(() => {
      // Load external stylesheets and fonts dynamically
      const preconnectLink = document.createElement('link');
      preconnectLink.href = 'https://fonts.gstatic.com/';
      preconnectLink.rel = 'preconnect';
      document.head.appendChild(preconnectLink);

      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);

      const fontAwesomeLink = document.createElement('link');
      fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      fontAwesomeLink.rel = 'stylesheet';
      document.head.appendChild(fontAwesomeLink);

      return () => {
          // Cleanup when component unmounts
          document.head.removeChild(fontLink);
          document.head.removeChild(fontAwesomeLink);
      };
  }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {

          const response = await fetch('http://localhost:5000/ext/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          // Parse response data
          const responseData = await response.json();
          const extInfo = responseData.ext;
      
          // Redirect to AfterLogin page and pass studentInfo as state
          navigate('/Ext/AfterLogin', { state: { extInfo } });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Login failed. Please try again later.');
        }
    };

    const handleSignupClick = () => {
      navigate('/Ext/Register');
    };
  
    return (
      <div className={`${ExtStyles.background}`} >



        <form className={ExtStyles.ext_form} onSubmit={handleSubmit}>
                <h3>Login</h3>
                <div>
                    <label>Email:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
                <h4>Don't have an Account?</h4>
                <button className={ExtStyles.signupButton} onClick={handleSignupClick}>Sign Up</button>
            </form>
        </div>
    );
};

export default ExtLogin;


