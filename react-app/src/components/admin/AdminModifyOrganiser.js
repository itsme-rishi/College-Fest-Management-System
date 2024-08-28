import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ModifyOrganiserPage = () => {
  const navigate = useNavigate();
  const { organiserId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    pastExperience: ''
  });

  useEffect(() => {
    // Fetch organiser details based on organiserId when component mounts
    fetchOrganiserDetails();
  }, []);

  const fetchOrganiserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api2/organisers/${organiserId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch organiser details');
      }
      const organiserData = await response.json();
      setFormData(organiserData);
    } catch (error) {
      console.error('Error fetching organiser details:', error);
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
      const response = await fetch(`http://localhost:5000/api2/modifyOrganisers/${organiserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to modify organiser');
      }
      alert('Organiser modified successfully!');
      navigate('/Admin/AfterLogin');
    } catch (error) {
      console.error('Error modifying organiser:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h1>Modify Organiser</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Past Experience (Description):</label>
          <input type="text" name="pastExperience" value={formData.pastExperience} onChange={handleChange} required />
        </div>
        <button type="submit">Modify</button>
      </form>
    </div>
  );
};

export default ModifyOrganiserPage;
