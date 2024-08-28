import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/adminAddEvent.css';

const AdminAddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    type: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format date for SQL (YYYY-MM-DD)
    const formattedDate = formData.date;

    // Format time for SQL (HH:MM:SS)
    const timeComponents = formData.time.split(':');
    const formattedTime = `${timeComponents[0]}:${timeComponents[1]}:00`;

    // Formatted data for SQL insertion
    const formattedFormData = {
      ...formData,
      date: formattedDate,
      time: formattedTime
    };

    console.log('Formatted formData:', formattedFormData);

    try {
      // console.log('formData:', JSON.stringify(formData));

      const response = await fetch('http://localhost:5000/api1/addEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedFormData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('data sent to backend, waiting for its response');

      const data = await response.json();

      console.log(`data : ${data}`);
      
      // Check response message
      if (data.message === 'Added Successfully') {
        alert('Event Added successful!');
        navigate('/Admin/AfterLogin');
      } else {
        alert('Not added event');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Process failed. Please try again later.');
    }
  };

  return (

    <div class="adminAddEvent_container_">
    <h1 class="adminAddEvent_h1_">Add an event</h1>
    <form class="adminAddEvent_form_" onSubmit={handleSubmit}>
        <div>
            <label class="adminAddEvent_label_">Name    :</label>
            <input class="adminAddEvent_input_1_" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminAddEvent_label_">Date    :</label>
            <input class="adminAddEvent_input_2_" type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminAddEvent_label_">Time    :</label>
            <input class="adminAddEvent_input_3_" type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminAddEvent_label_">Type (Description)    :</label>
            <input class="adminAddEvent_input_4_" type="text" name="type" value={formData.type} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminAddEvent_label_">Location    :</label>
            <input class="adminAddEvent_input_5_" type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <button class="adminAddEvent_button_" type="submit">Submit</button>
    </form>
</div>


  );
};

export default AdminAddEvent;
