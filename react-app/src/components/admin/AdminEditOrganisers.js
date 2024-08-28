import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/adminEditOrganisers.css';
 
const OrganiserManagement = () => {
  const [organisers, setOrganisers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganisers();
  }, []);

  const fetchOrganisers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api2/organisers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrganisers(data);
      console.log(`data is ${data}`);
    } catch (error) {
      console.error('Error fetching organisers:', error);
    }
  };

  const handleApproveOrganiser = async (organiserId) => {
    try {
      const response = await fetch(`http://localhost:5000/api2/approveOrganiser/${organiserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Update the organiser's approved status in the local state
      setOrganisers(prevOrganisers =>
        prevOrganisers.map(organiser =>
          organiser.id === organiserId ? { ...organiser, approved: true } : organiser
        )
      );
      alert('Organiser approved successfully!');
    } catch (error) {
      console.error('Error approving organiser:', error);
      alert('Failed to approve organiser. Please try again later.');
    }
  };

  const handleDeleteOrganiser = async (organiserId) => {
    try {
      const response = await fetch(`http://localhost:5000/api2/deleteOrganiser/${organiserId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the deleted organiser from the organisers list
      setOrganisers(prevOrganisers => prevOrganisers.filter(organiser => organiser.id !== organiserId));
      alert('Organiser deleted successfully!');
    } catch (error) {
      console.error('Error deleting organiser:', error);
      alert('Failed to delete organiser. Please try again later.');
    }
  };
 
  const handleAddOrganiser = () => {
    // Redirect to add organiser page
    navigate('/Admin/AfterLogin/EditOrganisers/AddOrganiser');
  };

  return (

<div>
<h2 class="adminEditOrganiser_h2_">Approved Organisers</h2>
<table class="adminEditOrganiser_table_">
    <thead>
        <tr>
            <th class="adminEditOrganiser_th_">Name</th>
            <th class="adminEditOrganiser_th_">Events</th>
        </tr>
    </thead>
    <tbody>
    {organisers.filter(organiser => organiser.approved).map((organiser) => (
        <tr key={organiser.id}>
            <td class="adminEditOrganiser_td_">{organiser.name}</td>
            <td class="adminEditOrganiser_td_">
                <span>
                    {organiser.events.map((event, index) => (
                        <React.Fragment key={event.id}>
                            {event.name}{index !== organiser.events.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </span>
            </td>
        </tr>
    ))}
</tbody>

</table>

<h2 class="adminEditOrganiser_h2_">Unapproved Organisers</h2>
<table class="adminEditOrganiser_table_un_">
    <thead>
        <tr>
            <th class="adminEditOrganiser_th_">Name</th>
            <th class="adminEditOrganiser_th_">Past Experience</th>
            <th class="adminEditOrganiser_th_">Events</th>
            <th class="adminEditOrganiser_th_">Actions</th>
        </tr>
    </thead>

<tbody>
    {organisers.filter(organiser => !organiser.approved).map((organiser) => (
        <tr key={organiser.id}>
            <td class="adminEditOrganiser_td_">{organiser.name}</td>
            <td class="adminEditOrganiser_td_">{organiser.pastexperience}</td>
            <td class="adminEditOrganiser_td_">
                <span>
                    {organiser.events.map((event, index) => (
                        <React.Fragment key={event.id}>
                            {event.name}{index !== organiser.events.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </span>
            </td>
            <td class="adminEditOrganiser_td_">
                <button class="adminEditOrganiser_button_" onClick={() => handleApproveOrganiser(organiser.id)}>Approve</button>
                <button class="adminEditOrganiser_button_" onClick={() => handleDeleteOrganiser(organiser.id)}>Decline</button>
            </td>
        </tr>
    ))}
</tbody>

</table>

{/* <button class="adminEditOrganiser_button_" onClick={handleAddOrganiser}>Add Organiser</button> */}
<button class="adminEditOrganiser_button_center_" onClick={handleAddOrganiser}>Add Organiser</button>
</div>


  );
};

export default OrganiserManagement;
