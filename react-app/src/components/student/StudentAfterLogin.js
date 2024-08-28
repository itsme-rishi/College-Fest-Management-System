import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import studentAfterLoginStyles from '../../css/studentafterlogin.module.css'; // Import the CSS module

// const [participationId, setParticipationId] = useState(null); // State to store participation ID

const StudentAfterLogin = () => {
    const { studentInfo } = useLocation().state;
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [showWinnersPopup, setShowWinnersPopup] = useState(false);
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
      try {
          const response = await fetch('http://localhost:5000/student/afterlogin/');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const eventData = await response.json();
          // Remove duplicate rows based on the "id" field
          const uniqueEvents = eventData.filter((event, index, self) =>
              index === self.findIndex(e => e.id === event.id)
          );
          setEvents(uniqueEvents);
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          alert('Failed to fetch events. Please try again later.');
      }
  };
  
  const handleLogout = () => {
    // Navigate to the home page
    navigate('/');
  };

  const handleParticipate = (eventId, eventInfo, studentInfo) => {
    // Send POST request to specific URL for participation
    const temp = 0;
    fetch('http://localhost:5000/student/afterlogin/participate_event/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventInfo, studentInfo, temp })
    })
    .then(response => {
      // Check if response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse response data
      return response.json();
    })
    .then(data => {
      // Display backend response as an alert message
      alert(data.message);
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  };
  


  const handleVolunteer = (eventId, eventInfo, studentInfo) => {
    // Send POST request to specific URL for volunteering
    fetch('http://localhost:5000/student/afterlogin/volunteer_event/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventInfo, studentInfo })
    })
    .then(response => {
      // Check if response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle response
      return response.json();
    })
    .then(data => {
      // Display message from backend as an alert
      alert(data.message);
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  };
  

const handleShowWinners = (eventId) => {
    // Create a URLSearchParams object and append the eventId as a query parameter
    const params = new URLSearchParams();
    params.append('eventId', eventId);
  
    fetch(`http://localhost:5000/student/afterlogin/event_winners?${params.toString()}`)
    .then(response => {
    if (!response.ok) {
        throw new Error('Winners yet to be declared');
    }
    return response.json();
    })
    .then(data => {
    setWinners(data.winners);
    setShowWinnersPopup(true);
    })
    .catch(error => {
    // Handle error
    alert(error.message); // Display the error message in an alert
    // console.error('Error:', error);
    });

  };
  
    return (
        <div className={studentAfterLoginStyles.afterlogin} > {/* Apply the styles from the CSS module */}
            
            <h1>EVENTS</h1>
            <button className={studentAfterLoginStyles.logoutButton} onClick={handleLogout}>Logout</button> {/* Logout button */}

            <table className={studentAfterLoginStyles.eventTable}>
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.name}</td>
                            <td>{event.type}</td>
                            <td>{event.location}</td>
                            <td>{new Date(event.date).toISOString().split('T')[0]}</td>

                            <td>
                                <button onClick={() => handleParticipate(event.id, event, studentInfo)}>Participate</button>
                                <button onClick={() => handleVolunteer(event.id, event, studentInfo)}>Volunteer</button>
                                <button onClick={() => handleShowWinners(event.id)}>Show Winners</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showWinnersPopup && (
                <div className={studentAfterLoginStyles.winnersPopup}>
                    <h2>Winners</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>PID</th>
                                <th>Winner Name</th>
                                <th>College Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {winners.map((winner, index) => (
                                <tr key={index}>
                                    <td>{winner.pid}</td>
                                    <td>{winner.winner_name}</td>
                                    <td>{winner.college_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => setShowWinnersPopup(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default StudentAfterLogin;
