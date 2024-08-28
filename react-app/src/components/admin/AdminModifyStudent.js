import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ModifyStudentPage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    department: '',
    gender: '',
    password: '',
    instituteEmail: ''
  });

  useEffect(() => {
    // Fetch student details based on studentId when component mounts
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api3/students/${studentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student details');
      }
      const studentData = await response.json();
      setFormData(studentData);
    } catch (error) {
      console.error('Error fetching student details:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api3/modifyStudents/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to modify student');
      }
      alert('Student modified successfully!');
      navigate('/Admin/AfterLogin');
    } catch (error) {
      console.error('Error modifying student:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h1>Modify Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Roll:</label>
          <input type="text" name="roll" value={formData.roll} onChange={handleChange} required />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Institute Email:</label>
          <input type="email" name="instituteEmail" value={formData.instituteEmail} onChange={handleChange} required />
        </div>
        <button type="submit">Modify</button>
      </form>
    </div>
  );
};

export default ModifyStudentPage;
