
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import loginStyles from '../../css/login.module.css'; // Import the CSS module

// const OrganiserLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/api/organiser/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       console.log(`data message : ${data.message}`);

//       if (data.message === 'Match') {
//         alert('Login successful!');
//         navigate('/Organiser/AfterLogin', { state: { organiserId: data.organiserId } });
//       } else if (data.message === 'Username or password is incorrect') {
//         alert('Username or password is incorrect');
//       } else if (data.message === 'Your account is not approved yet') {
//         alert('Your account is not approved yet');
//       } else {
//         alert('Unexpected response from server');
//       }
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//       alert('Login failed. Please try again later.');
//     }
//   };

//   return (
//     <div className={loginStyles.background}>
//       <h1 className={loginStyles.heading}>Welcome to Organiser login page</h1>
//       <form className={loginStyles.login_form} onSubmit={handleSubmit}>
//         <h3>Login</h3>
//         <div>
//           <h4>Username:</h4>
//           <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" required />
//         </div>
//         <div>
//           <h4>Password:</h4>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default OrganiserLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrgStyles from '../../css/ext.login.module.css'; // Import the CSS module

const OrganiserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/organiser/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      console.log(`data message : ${data.message}`);

      if (data.message === 'Match') {
        alert('Login successful!');
        navigate('/Organiser/AfterLogin', { state: { organiserId: data.organiserId } });
      } else if (data.message === 'Username or password is incorrect') {
        alert('Username or password is incorrect');
      } else if (data.message === 'Your account is not approved yet') {
        alert('Your account is not approved yet');
      } else {
        alert('Unexpected response from server');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Login failed. Please try again later.');
    }
  };

  const handleSignupClick = () => {
    navigate('/Organiser/Register');
  };

  return (
    <div className={`${OrgStyles.background}`} >
      <form className={OrgStyles.ext_form} onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
        <h4>Don't have an Account?</h4>
        <button className={OrgStyles.signupButton} onClick={handleSignupClick}>Sign Up</button>
      </form>
    </div>
  );
};

export default OrganiserLogin;
