import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import OrgStyles from '../../css/org.afterlogin.module.css'; // Import the CSS module
import EditVolStyles from '../../css/org.editvolunteer.module.css'; // Import the editvolunteer CSS module
import studentAfterLoginStyles from '../../css/studentafterlogin.module.css'; // Import the CSS module


const EventManagement = () => {
  const location = useLocation();
  const organiserId = location.state.organiserId;

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api6/${organiserId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
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
    <div className={OrgStyles.background}>
      <h1 className={OrgStyles.heading}>Welcome Organiser {/*organiserId*/}</h1>
      <button className={studentAfterLoginStyles.logoutButton} onClick={handleLogout}>Logout</button> {/* Logout button */}

      <div className={OrgStyles.button_row}>
        <button className={OrgStyles.button_row_button} onClick={handleEditEventsClick}>Edit Events</button>
        <button className={OrgStyles.button_row_button} onClick={handleShowParticipantsClick}>Show Participants</button>
        <button className={OrgStyles.button_row_button} onClick={handleEditVolunteersClick}>Edit Volunteers</button>
      </div>

       <h1 className={EditVolStyles.edit_volunteer_table_h3}> List of participants for each event in which you are organiser</h1>
      {events.map(event => (
        <div key={event.id}>
          <h2 className={EditVolStyles.edit_volunteer_table_h2}> {event.name}</h2>
          <table className={EditVolStyles.edit_volunteer_table}>
            <thead>
              <tr>
                <th className={EditVolStyles.edit_volunteer_th}>Participant Type</th>
                <th className={EditVolStyles.edit_volunteer_th}>Name</th>
                <th className={EditVolStyles.edit_volunteer_th}>Email</th>
                <th className={EditVolStyles.edit_volunteer_th}>College Name</th>
              </tr>
            </thead>
            <tbody>
              {event.participants.map(participant => (
                <tr key={participant.id}>
                  <td className={EditVolStyles.edit_volunteer_td}>{participant.type}</td>
                  <td className={EditVolStyles.edit_volunteer_td}>{participant.name}</td>
                  <td className={EditVolStyles.edit_volunteer_td}>{participant.email}</td>
                  <td className={EditVolStyles.edit_volunteer_td}>{participant.collegeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default EventManagement;
