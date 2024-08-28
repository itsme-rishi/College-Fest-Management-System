// // export default OrganizerRegister;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const OrganizerRegister = () => {
//     const navigate = useNavigate();
    
//     const [formData, setFormData] = useState({
//         name: '',
//         username: '',
//         password: '',
//         confirmPassword: '',
//         pastExperience: '',
//         approved: 0,
//         selectedEvents: []
//     });

    
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'selectedEvents') {
//             const options = e.target.options;
//             const selectedEvents = [];
//             for (let i = 0; i < options.length; i++) {
//                 if (options[i].selected) {
//                     selectedEvents.push(options[i].value);
//                 }
//             }
//             setFormData({
//                 ...formData,
//                 selectedEvents: selectedEvents
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//         }
//     };

//     const handleEventClick = (eventId) => {
//         const isSelected = formData.selectedEvents.includes(eventId);
//         if (isSelected) {
//             setFormData({
//                 ...formData,
//                 selectedEvents: formData.selectedEvents.filter(id => id !== eventId)
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 selectedEvents: [...formData.selectedEvents, eventId]
//             });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.password !== formData.confirmPassword) {
//             alert("Passwords do not match!");
//             return;
//         }
//         // Send formData to backend
//         console.log(formData); // Replace this with your backend submission code
//         try {
//             const response = await fetch('http://localhost:5000/api/organiser/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             alert('Registration successful!');
//             navigate('/Organiser/Login'); // Redirect to organizer login page
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//             alert('Registration failed. Please try again later.');
//         }
//     };

//     return (
//         <div>
//             <h1>Welcome to organizer registration page</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Name:</label>
//                     <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Username:</label>
//                     <input type="text" name="username" value={formData.username} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Confirm Password:</label>
//                     <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Past Experience:</label>
//                     <textarea name="pastExperience" value={formData.pastExperience} onChange={handleChange} required />
//                 </div>

//                 <div>
//                     <label>Events:</label>
//                     {events.map(event => (
//                         <div key={event.id}>
//                             <input
//                                 type="checkbox"
//                                 id={`event-${event.id}`}
//                                 checked={formData.selectedEvents.includes(event.id)}
//                                 onChange={() => handleEventClick(event.id)}
//                             />
//                             <label htmlFor={`event-${event.id}`} className="checkbox-label">{event.name}</label>
//                         </div>
//                     ))}
//                 </div>
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default OrganizerRegister;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/org.register.module.css'; // Import the CSS module

const OrganizerRegister = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        pastExperience: '',
        approved: 0,
        selectedEvents: []
    });

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events from backend
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api1/events');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // Log the response data
            setEvents(data);
        } catch (error) {
            console.error('There was a problem fetching events:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'selectedEvents') {
            const options = e.target.options;
            const selectedEvents = [];
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    selectedEvents.push(options[i].value);
                }
            }
            setFormData({
                ...formData,
                selectedEvents: selectedEvents
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleEventClick = (eventId) => {
        const isSelected = formData.selectedEvents.includes(eventId);
        if (isSelected) {
            setFormData({
                ...formData,
                selectedEvents: formData.selectedEvents.filter(id => id !== eventId)
            });
        } else {
            setFormData({
                ...formData,
                selectedEvents: [...formData.selectedEvents, eventId]
            });
        }
    };
    const handleEventSelect = (event) => {
        const selectedEventIds = Array.from(event.target.selectedOptions, option => parseInt(option.value));
        setFormData({ ...formData, selectedEvents: selectedEventIds });
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Send formData to backend
        console.log(formData); // Replace this with your backend submission code
        try {
            const response = await fetch('http://localhost:5000/api/organiser/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Registration successful!');
            navigate('/Organiser/Login'); // Redirect to organizer login page
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Registration failed. Please try again later.');
        }
    };

    return (
        <div className={styles.background}>
            <form onSubmit={handleSubmit} className={styles.ext_register_form}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <div>
                    <label>Past Experience:</label>
                    <textarea name="pastExperience" value={formData.pastExperience} onChange={handleChange} required />
                </div>
                <div>
                <label htmlFor="selectedEvents">Events:</label>
                <select
                    id="selectedEvents"
                    multiple
                    onChange={handleEventSelect}
                >
                    {events.map(event => (
                    <option key={event.id} value={event.id}>
                        {event.name}
                    </option>
                    ))}
                </select>
                </div>



                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default OrganizerRegister;
