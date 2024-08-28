
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import OrgStyles from '../../css/org.afterlogin.module.css'; // Import the CSS module
import EditVolStyles from '../../css/org.editvolunteer.module.css'; // Import the CSS module
import studentAfterLoginStyles from '../../css/studentafterlogin.module.css'; // Import the CSS module




const VolunteerManagement = () => {
  const location = useLocation();
  const organiserId = location.state.organiserId;

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    console.log(`Before fetching volunteers: Organiser ID = ${organiserId}`);
    try {
      const response = await fetch(`http://localhost:5000/api7/${organiserId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Volunteers before filtering:', data);

      setEvents(data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const handleRemoveVolunteer = async (volunteerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api7/removeVolunteer/${volunteerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove volunteer');
      }
      // Refetch volunteers after removal
      fetchVolunteers();
    } catch (error) {
      console.error('Error removing volunteer:', error);
    }
  };

  const handleApproveVolunteer = async (volunteerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api7/approveVolunteer/${volunteerId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to approve volunteer');
      }
      // Refetch volunteers after approval
      fetchVolunteers();
    } catch (error) {
      console.error('Error approving volunteer:', error);
    }
  };

  const handleDeclineVolunteer = async (volunteerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api7/declineVolunteer/${volunteerId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to decline volunteer');
      }
      // Refetch volunteers after decline
      fetchVolunteers();
    } catch (error) {
      console.error('Error declining volunteer:', error);
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
  {events.map(event => (
        <div key={event.id}>
        <h2 className={EditVolStyles.edit_volunteer_table_h2}>{event.name}</h2>
        <h3 className={EditVolStyles.edit_volunteer_table_h3}>List of Approved Volunteers</h3>
        <table className={EditVolStyles.edit_volunteer_table}>
          <thead>
            <tr>
              <th className={EditVolStyles.edit_volunteer_th}>ID</th>
              <th className={EditVolStyles.edit_volunteer_th}>Name</th>
              <th className={EditVolStyles.edit_volunteer_th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {event.volunteers.map(volunteer => (
              volunteer.approved && volunteer.name &&(
                <tr key={volunteer.id}>
                  <td className={EditVolStyles.edit_volunteer_td}>{volunteer.id}</td>
                  <td className={EditVolStyles.edit_volunteer_td}>{volunteer.name}</td>
                  <td className={EditVolStyles.edit_volunteer_td}>
                    <button className={EditVolStyles.edit_volunteer_button} onClick={() => handleRemoveVolunteer(volunteer.id)}>Remove Volunteer</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
        <h3 className={EditVolStyles.edit_volunteer_table_h3}>List of Unapproved Volunteers</h3>
        <table className={EditVolStyles.edit_volunteer_table}>
          <thead>
            <tr>
              <th className={EditVolStyles.edit_volunteer_th}>ID</th>
              <th className={EditVolStyles.edit_volunteer_th}>Name</th>
              <th className={EditVolStyles.edit_volunteer_th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {event.volunteers.map(volunteer => (
              !volunteer.approved && volunteer.name && (
                <tr key={volunteer.id}>
                  <td className={EditVolStyles.edit_volunteer_td}>{volunteer.id}</td>
                  <td className={EditVolStyles.edit_volunteer_td}>{volunteer.name}</td>
                  <td className={EditVolStyles.edit_volunteer_td}>
                    <button className={EditVolStyles.edit_volunteer_button} onClick={() => handleApproveVolunteer(volunteer.id)}>Approve</button>
                    <button className={EditVolStyles.edit_volunteer_button} onClick={() => handleDeclineVolunteer(volunteer.id)}>Decline</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
          
        </table>
        <table>
    <tbody>
      <tr>
        <td> 
        </td>
        </tr> {/* Blank row */}
    </tbody>
  </table>
      </div>
        ))}
    </div>
  );
};

export default VolunteerManagement;
