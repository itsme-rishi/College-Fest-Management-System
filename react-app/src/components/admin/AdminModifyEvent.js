import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../../css/adminModifyEvent.css';

const ModifyEventPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
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

        // Check and adjust date format (yyyy-mm-dd)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(eventData.date)) {
            const currentDate = new Date(eventData.date);
            const formattedDate = currentDate.toISOString().split('T')[0];
            eventData.date = formattedDate;
        }

        // Check and adjust time format (hh-mm)
        // const timeRegex = /^\d{2}:\d{2}$/;
        // if (!timeRegex.test(eventData.time)) {
        //   console.log(`bef before : ${eventData.time}`);
        //     const currentTime = new Date(`2000-01-01T${eventData.time}`);
        //     console.log(`before : ${currentTime}`);
        //     const formattedTime = currentTime.toTimeString().split(' ')[0];
        //     console.log(`after : ${formattedTime}`);
        //     eventData.time = formattedTime;
        // }

        const timeString = eventData.time;
        const timeParts = timeString.split(":");
        const formattedTime = `${timeParts[0]}:${timeParts[1]}`;

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
      navigate('/Admin/AfterLogin');
    } catch (error) {
      console.error('Error modifying event:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (

    <div class="adminModifyEvent_container_">
    <h1 class="adminModifyEvent_h1_">Modify Event</h1>
    <form class="adminModifyEvent_form_" onSubmit={handleSubmit}>
        <div>
            <label class="adminModifyEvent_label_">Name     :     </label>
            <input class="adminModifyEvent_input_1_" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminModifyEvent_label_">Date     :     </label>
            <input class="adminModifyEvent_input_2_" type="date" name="date" value={formData.date} onChange={handleChange} required />
            {/* <input class="adminModifyEvent_input_2_" type="date" name="date" value={new Date(formData.date).toISOString().split('T')[0]} onChange={handleChange} required /> */}
        </div>
        <div>
            <label class="adminModifyEvent_label_">Time     :     </label>
            {/* <input class="adminModifyEvent_input_3_" type="time" name="time" value={formData.time.slice(0, 5)} onChange={handleChange} required /> */}
            <input class="adminModifyEvent_input_3_" type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminModifyEvent_label_">Type (Description)     :     </label>
            <input class="adminModifyEvent_input_4_" type="text" name="type" value={formData.type} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminModifyEvent_label_">Location     :     </label>
            <input class="adminModifyEvent_input_5_" type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <button class="adminModifyEvent_button_" type="submit">Modify</button>
    </form>
</div>

  );
};

export default ModifyEventPage;
 