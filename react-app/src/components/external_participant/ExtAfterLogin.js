import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from '../../css/studentafterlogin.module.css'; // Import the CSS module
import studentAfterLoginStyles from '../../css/studentafterlogin.module.css'; // Import the CSS module


const ExtAfterLogin = () => {
    const { extInfo } = useLocation().state;
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [showWinnersPopup, setShowWinnersPopup] = useState(false);
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/ext/afterlogin/');
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
    const handleParticipate = (eventId, eventInfo, extInfo) => {
        // Send POST request to specific URL for participation
        const temp = 1;
        fetch('http://localhost:5000/ext/afterlogin/participate_event/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventInfo, extInfo, temp })
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
                alert(error.message);
            });
    };

    return (
        <div className={`${styles.afterlogin}`} > {/* Apply the styles from the CSS module */}

            <h1>EVENTS</h1>
            <button className={studentAfterLoginStyles.logoutButton} onClick={handleLogout}>Logout</button> {/* Logout button */}

            <table className={`${styles.eventTable}`}>
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
                                <button onClick={() => handleParticipate(event.id, event, extInfo)}>Participate</button>
                                <button onClick={() => handleShowWinners(event.id)}>Show Winners</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showWinnersPopup && (
                <div className={`${styles.winnersPopup}`}>
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
export default ExtAfterLogin;
