import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    department: '',
    gender: '',
    password: '',
    instituteEmail: ''
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
      const response = await fetch('http://localhost:5000/api3/addStudent', {
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
      
      // Check response message
      if (data.message === 'Student added successfully') {
        alert('Student added successfully!');
        navigate('/Admin/AfterLogin');
      } else {
        alert('Failed to add student');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Process failed. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Welcome to admin page add student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Roll:</label>
          <input type="text" name="roll" value={formData.roll} onChange={handleChange} required />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Institute Email:</label>
          <input type="email" name="instituteEmail" value={formData.instituteEmail} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminAddStudent;
