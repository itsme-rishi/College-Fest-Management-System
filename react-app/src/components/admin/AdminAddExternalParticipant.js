import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAddExternalParticipant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    gender: '',
    gmail: '',
    password: '',
    food: '',
    hall: ''
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
      const response = await fetch('http://localhost:5000/api4/addExternalParticipant', {
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
      if (data.message === 'External Participant added successfully') {
        alert('External Participant added successfully!');
        navigate('/Admin/AfterLogin');
      } else {
        alert('Failed to add External Participant');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Process failed. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Welcome to admin page add External Participant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>College Name:</label>
          <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
        </div>
        <div>
          <label>Gmail:</label>
          <input type="email" name="gmail" value={formData.gmail} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Food (Veg or Non-Veg):</label>
          <input type="text" name="food" value={formData.food} onChange={handleChange} required />
        </div>
        <div>
          <label>Hall (Guest House 1,2,3,4,5):</label>
          <input type="text" name="hall" value={formData.hall} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminAddExternalParticipant;
