import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrgStyles from '../../css/org.afterlogin.module.css'; // Import the CSS module

import studentAfterLoginStyles from '../../css/studentafterlogin.module.css'; // Import the CSS module


const OrganiserAfterLogin = () => {
    const location = useLocation();
    const organiserId = location.state.organiserId;
    const navigate = useNavigate();

    console.log(`org id in after login page = ${organiserId}`);

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
        <div className={OrgStyles.body}>
            <h1 className={OrgStyles.heading}>Welcome Organiser {/*organiserId*/}</h1>
            <button className={studentAfterLoginStyles.logoutButton} onClick={handleLogout}>Logout</button> {/* Logout button */}

            <div className={OrgStyles.button_row}>
                <button className={OrgStyles.button_row_button} onClick={handleEditEventsClick}>Edit Events</button>
                <button className={OrgStyles.button_row_button} onClick={handleShowParticipantsClick}>Show Participants</button>
                <button className={OrgStyles.button_row_button} onClick={handleEditVolunteersClick}>Edit Volunteers</button>
            </div>
        </div>
    );
       
};

export default OrganiserAfterLogin;
