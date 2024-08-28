import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/adminEditEvents.css';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api1/events');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/api1/deleteEvent/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the deleted event from the events list
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again later.');
    }
  };
 
  const handleAddEvent = () => {
    // Redirect to add event page
    navigate('/Admin/AfterLogin/EditEvents/AddEvent');
  };

  const handleModifyEvent = (eventId) => {
    // Redirect to modify event page with the event ID as a query parameter
    navigate(`/Admin/AfterLogin/EditEvents/ModifyEvent/${eventId}`);
  };

  return (
    // <div>
    //   <h2>Event Management</h2>
    //   <ul>
    //     {events.map((event) => (
    //       <li key={event.id}>
    //         {event.name}
    //         <button onClick={() => handleModifyEvent(event.id)}>Modify</button>
    //         <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
    //       </li>
    //     ))}
    //   </ul>
    //   <button onClick={handleAddEvent}>Add Event</button>
    // </div>


    // <div class="adminEditEvents_container_">
    //     <h2 class="adminEditEvents_h2_">Event Management</h2>
    //     <ul class="adminEditEvents_ul_">
    //         {events.map((event) => (
    //             <li class="adminEditEvents_li_" key={event.id}>
    //                 {event.name}
    //                 <button class="adminEditEvents_button_" onClick={() => handleModifyEvent(event.id)}>Modify</button>
    //                 <button class="adminEditEvents_button_" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
    //             </li>
    //         ))}
    //     </ul>
    //     <button class="adminEditEvents_button_" onClick={handleAddEvent}>Add Event</button>
    // </div>

    <div class="adminEditEvents_container_">
    <h2 class="adminEditEvents_h2_">Event Management</h2>
    {/* <ul class="adminEditEvents_ul_">
        {events.map((event) => (
            <li class="adminEditEvents_li_" key={event.id}>
                {event.name}
                <button class="adminEditEvents_button_" onClick={() => handleModifyEvent(event.id)}>Modify</button>
                <button class="adminEditEvents_button_" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </li>
        ))}
    </ul> */}
    {/* <button class="adminEditEvents_button_" onClick={handleAddEvent}>Add Event</button> */}

    <table class="adminEditEvents_table_">
        <thead>
            <tr>
                <th class="adminEditEvents_th_">Event Name</th>
                <th class="adminEditEvents_th_">Location</th>
                <th class="adminEditEvents_th_">Date</th>
                <th class="adminEditEvents_th_">Actions</th>
            </tr>
        </thead>
        <tbody>
            {events.map((event) => (
                <tr key={event.id}>
                    <td class="adminEditEvents_td_">{event.name}</td>
                    <td class="adminEditEvents_td_">{event.location}</td>
                    <td class="adminEditEvents_td_">{new Date(event.date).toISOString().split('T')[0]}</td>
                    <td class="adminEditEvents_td_">
                        <button class="adminEditEvents_button_" onClick={() => handleModifyEvent(event.id)}>Modify</button>
                        <button class="adminEditEvents_button_" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </td>
                </tr> 
            ))}
        </tbody>
    </table>

    <button class="adminEditEvents_button_add_" onClick={handleAddEvent}>Add Event</button>
</div>


  );
};

export default EventManagement;
