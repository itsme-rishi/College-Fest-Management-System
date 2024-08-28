import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ModifyExternalParticipantPage = () => {
  const navigate = useNavigate();
  const { participantId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    gender: '',
    gmail: '',
    password: '',
    food: '',
    hall: ''
  });

  useEffect(() => {
    // Fetch participant details based on participantId when component mounts
    fetchParticipantDetails();
  }, []);

  const fetchParticipantDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api4/externalparticipants/${participantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch participant details');
      }
      const participantData = await response.json();
      setFormData(participantData);
    } catch (error) {
      console.error('Error fetching participant details:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api4/modifyExternalParticipants/${participantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to modify participant');
      }
      alert('Participant modified successfully!');
      navigate('/Admin/AfterLogin');
    } catch (error) {
      console.error('Error modifying participant:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h1>Modify External Participant</h1>
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
        <button type="submit">Modify</button>
      </form>
    </div>
  );
};

export default ModifyExternalParticipantPage;
