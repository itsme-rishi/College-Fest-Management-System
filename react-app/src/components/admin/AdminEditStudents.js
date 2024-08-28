import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/adminEditStudents.css';

const StudentManagement = () => {
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [unapprovedStudents, setUnapprovedStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api3/students');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Filter students into approved and unapproved lists
      const approved = data.filter(student => student.approved);
      const unapproved = data.filter(student => !student.approved);
      setApprovedStudents(approved);
      setUnapprovedStudents(unapproved);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleApproveStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api3/approveStudent/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Refresh the students list after approval
      fetchStudents();
      alert('Student approved successfully!');
    } catch (error) {
      console.error('Error approving student:', error);
      alert('Failed to approve student. Please try again later.');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api3/deleteStudent/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Refresh the students list after deletion
      fetchStudents();
      alert('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again later.');
    }
  };
 
  const handleAddStudent = () => {
    // Redirect to add student page
    navigate('/Admin/AfterLogin/EditStudents/AddStudent');
  };

  const handleModifyStudent = (studentId) => {
    // Redirect to modify student page with the student ID as a query parameter
    navigate(`/Admin/AfterLogin/EditStudents/ModifyStudent/${studentId}`);
  };

  return (
    // <div>
    //   <h2>Approved Students</h2>
    //   <ul>
    //     {approvedStudents.map((student) => (
    //       <li key={student.id}>
    //         {student.name}
    //       </li>
    //     ))}
    //   </ul>
    //   <h2>Unapproved Students</h2>
    //   <ul>
    //     {unapprovedStudents.map((student) => (
    //       <li key={student.id}>
    //         {student.name}
    //         <button onClick={() => handleApproveStudent(student.id)}>Approve</button>
    //         <button onClick={() => handleDeleteStudent(student.id)}>Decline</button>
    //       </li>
    //     ))}
    //   </ul>
    //   <button onClick={handleAddStudent}>Add Student</button>
    // </div>

//     <div>
//     <h2 class="adminEditStudents_h2_">Approved Students</h2>
//     <table class="adminEditStudents_table_approved">
//         <thead>
//             <tr>
//                 <th class="adminEditStudents_th_approved">Student Name</th>
//             </tr>
//         </thead>
//         <tbody>
//             {approvedStudents.map((student) => (
//             <tr key={student.id}>
//                 <td class="adminEditStudents_td_approved">{student.name}</td>
//             </tr>
//             ))}
//         </tbody>
//     </table>
//     <h2 class="adminEditStudents_h2_">Unapproved Students</h2>
//     <table class="adminEditStudents_table_unapproved">
//         <thead>
//             <tr>
//                 <th class="adminEditStudents_th_unapproved">Student Name</th>
//                 <th class="adminEditStudents_th_unapproved">Actions</th>
//             </tr>
//         </thead>
//         <tbody>
//             {unapprovedStudents.map((student) => (
//             <tr key={student.id}>
//                 <td class="adminEditStudents_td_unapproved">{student.name}</td>
//                 <td class="adminEditStudents_td_unapproved">
//                     <button class="adminEditStudents_button_" onClick={() => handleApproveStudent(student.id)}>Approve</button>
//                     <button class="adminEditStudents_button_" onClick={() => handleDeleteStudent(student.id)}>Decline</button>
//                 </td>
//             </tr>
//             ))}
//         </tbody>
//     </table>
//     <button class="adminEditStudents_button_add_" onClick={handleAddStudent}>Add Student</button>
// </div>

<div>
<h2 class="adminEditStudents_h2_">Approved Students</h2>
<table class="adminEditStudents_table_approved">
    <thead>
        <tr>
        <th class="adminEditStudents_th_approved">Roll Number</th>
            <th class="adminEditStudents_th_approved">Student Name</th>
        </tr>
    </thead>
    <tbody>
        {approvedStudents.map((student) => (
        <tr key={student.id}>
          <td class="adminEditStudents_td_approved">{student.roll}</td>
            <td class="adminEditStudents_td_approved">{student.name}</td>
        </tr>
        ))}
    </tbody>
</table>
<h2 class="adminEditStudents_h2_">Unapproved Students</h2>
<table class="adminEditStudents_table_unapproved">
    <thead>
        <tr>
            <th class="adminEditStudents_th_unapproved">Roll Number</th>
            <th class="adminEditStudents_th_unapproved">Student Name</th>
            <th class="adminEditStudents_th_unapproved">Institute Email</th>
            <th class="adminEditStudents_th_unapproved">Department</th>
            <th class="adminEditStudents_th_unapproved">Actions</th>
        </tr>
    </thead>
    <tbody>
        {unapprovedStudents.map((student) => (
        <tr key={student.id}>
          <td class="adminEditStudents_td_unapproved">{student.roll}</td>
            <td class="adminEditStudents_td_unapproved">{student.name}</td>
            <td class="adminEditStudents_td_unapproved">{student.institute_email}</td>
            <td class="adminEditStudents_td_unapproved">{student.department}</td>
            <td class="adminEditStudents_td_unapproved">
                <button class="adminEditStudents_button_" onClick={() => handleApproveStudent(student.id)}>Approve</button>
                <button class="adminEditStudents_button_" onClick={() => handleDeleteStudent(student.id)}>Decline</button>
            </td>
        </tr>
        ))}
    </tbody>
</table>
{/* <button class="adminEditStudents_button_add_" onClick={handleAddStudent}>Add Student</button> */}
</div>



  );
};

export default StudentManagement;
