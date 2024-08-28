import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import OrgStyles from '../../css/org.afterlogin.module.css'; // Import the CSS module
import styles from '../../css/org.editevents.module.css'; // Import the CSS module
import studentAfterLoginStyles from '../../css/studentafterlogin.module.css'; // Import the CSS module


const EventManagement = () => {
  const location = useLocation();
  const organiserId = location.state.organiserId;

  // console.log(`org id in edit event page = ${organiserId}`);

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api5/org_event/${organiserId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleModifyEvent = (eventId) => {
    navigate(`/Organiser/AfterLogin/EditEvents/ModifyEvent/${eventId}`, { state: { organiserId } });
  };

  const handleEditEventsClick = () => {
    navigate('/Organiser/AfterLogin/EditEvents', { state: { organiserId } });
  };

  const handleShowParticipantsClick = () => {
      navigate('/Organiser/AfterLogin/ShowParticipants', { state: { organiserId } });
  };

  const handleEditVolunteersClick = () => {
      navigate('/Organiser/AfterLogin/EditVolunteers', { state: { organiserId } });
  };

  const handleLogout = () => {
    // Navigate to the home page
    navigate('/');
  };
  




  return (
  <div className={OrgStyles.background} >
  <h1 className={OrgStyles.heading}>Welcome Organiser {/*organiserId*/}</h1>
  <button className={studentAfterLoginStyles.logoutButton} onClick={handleLogout}>Logout</button> {/* Logout button */}

  <div className={OrgStyles.button_row}>
      <button className={OrgStyles.button_row_button} onClick={handleEditEventsClick}>Edit Events</button>
      <button className={OrgStyles.button_row_button} onClick={handleShowParticipantsClick}>Show Participants</button>
      <button className={OrgStyles.button_row_button} onClick={handleEditVolunteersClick}>Edit Volunteers</button>
  </div>

<div>
  <h2 className={styles.edit_events_h2}>Event Management</h2>
  <table className={styles.edit_events_table}>
    <thead>
      <tr>
        <th className={styles.edit_events_th}>ID</th>
        <th className={styles.edit_events_th}>Name</th>
        <th className={styles.edit_events_th}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {events.map((event) => (
        <tr key={event.id}>
          <td className={styles.edit_events_td}>{event.id}</td>
          <td className={styles.edit_events_td}>{event.name}</td>
          <td className={styles.edit_events_td}>
            <button className={styles.edit_events_button} onClick={() => handleModifyEvent(event.id)}>Modify Event</button>
            {/* <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button> */}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>



  );
};

export default EventManagement;




