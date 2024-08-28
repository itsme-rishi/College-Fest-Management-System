import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const ModifyEventPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const location = useLocation();
  const organiserId = location.state.organiserId;

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    type: '',
    location: ''
  });

  useEffect(() => {
    // Fetch event details based on eventId when component mounts
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api1/events/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
      const eventData = await response.json();
      setFormData(eventData);
    } catch (error) {
      console.error('Error fetching event details:', error);
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
      const response = await fetch(`http://localhost:5000/api1/modifyEvents/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to modify event');
      } 
      alert('Event modified successfully!');

      navigate('/Organiser/AfterLogin', { state: { organiserId } });
    } catch (error) {
      console.error('Error modifying event:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h1>Modify Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <div>
          <label>Type (Description):</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <button type="submit">Modify</button>
      </form>
    </div>
  );
};

export default ModifyEventPage;
