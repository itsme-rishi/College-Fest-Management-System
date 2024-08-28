import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/adminAddOrganiser.css' ;

const AdminAddOrganiser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    pastExperience: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api2/addOrganiser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Check response message
      if (data.message === 'Organiser added successfully') {
        alert('Organiser added successfully!');
        navigate('/Admin/AfterLogin');
      } else {
        alert('Failed to add organiser');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Process failed. Please try again later.');
    }
  };

  return (
    // <div>
    //   <h1>Add an organiser</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Name:</label>
    //       <input type="text" name="name" value={formData.name} onChange={handleChange} required />
    //     </div>
    //     <div>
    //       <label>Username:</label>
    //       <input type="text" name="username" value={formData.username} onChange={handleChange} required />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input type="password" name="password" value={formData.password} onChange={handleChange} required />
    //     </div>
    //     <div>
    //       <label>Past Experience (Description):</label>
    //       <input type="text" name="pastExperience" value={formData.pastExperience} onChange={handleChange} required />
    //     </div>
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>

    <div class="adminAddOrganiser_container_">
    <h1 class="adminAddOrganiser_h1_">Add an organiser</h1>
    <form class="adminAddOrganiser_form_" onSubmit={handleSubmit}>
        <div>
            <label class="adminAddOrganiser_label_">Name :</label>
            <input class="adminAddOrganiser_input_1_" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminAddOrganiser_label_">Username :</label>
            <input class="adminAddOrganiser_input_2_" type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminAddOrganiser_label_">Password :</label>
            <input class="adminAddOrganiser_input_3_" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
            <label class="adminAddOrganiser_label_">Past Experience (Description) :</label>
            <input class="adminAddOrganiser_input_4_" type="text" name="pastExperience" value={formData.pastExperience} onChange={handleChange} required />
        </div>
        <button class="adminAddOrganiser_button_" type="submit">Submit</button>
    </form>
</div>

  );
};

export default AdminAddOrganiser;
