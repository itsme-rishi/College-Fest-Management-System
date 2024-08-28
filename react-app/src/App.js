import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import styles from './css/home.module.css'; 
// admin
import Admin from './components/admin/AdminLogin';
import AdminRegister from './components/admin/AdminRegister';
import AdminLogin from './components/admin/AdminLogin';
import AdminAfterLogin from './components/admin/AdminAfterLogin';

import AdminAddAdmin from './components/admin/AdminAddAdmin';

import AdminEditEvents from './components/admin/AdminEditEvents';
import AdminAddEvent from './components/admin/AdminAddEvent';
import AdminModifyEvent from './components/admin/AdminModifyEvent';

import AdminEditOrganisers from './components/admin/AdminEditOrganisers';
import AdminAddOrganiser from './components/admin/AdminAddOrganiser';
import AdminModifyOrganiser from './components/admin/AdminModifyOrganiser';

import AdminEditStudents from './components/admin/AdminEditStudents';
import AdminAddStudent from './components/admin/AdminAddStudent';
import AdminModifyStudent from './components/admin/AdminModifyStudent';

import AdminEditExternalParticipants from './components/admin/AdminEditExternalParticipants';
import AdminAddExternalParticipant from './components/admin/AdminAddExternalParticipant';
import AdminModifyExternalParticipant from './components/admin/AdminModifyExternalParticipant';

//Organiser
import Organiser from './components/organiser/Organiser';
import OrganiserRegister from './components/organiser/OrganiserRegister';
import OrganiserLogin from './components/organiser/OrganiserLogin';
import OrganiserAfterLogin from './components/organiser/OrganiserAfterLogin';

import OrganiserEditEvents from './components/organiser/OrganiserEditEvents';
import OrganiserModifyEvent from './components/organiser/OrganiserModifyEvent';
import OrganiserShowParticipants from './components/organiser/OrganiserShowParticipants';
import OrganiserEditVolunteers from './components/organiser/OrganiserEditVolunteers';

//Student
import Student from './components/student/Student';
import StudentRegister from './components/student/StudentRegister';
import StudentLogin from './components/student/StudentLogin';
import StudentAfterLogin from './components/student/StudentAfterLogin';
     
//External Student
import Ext from './components/external_participant/Ext';
import ExtRegister from './components/external_participant/ExtRegister';
import ExtLogin from './components/external_participant/ExtLogin';
import ExtAfterLogin from './components/external_participant/ExtAfterLogin';
  
const Home = () => {

  useEffect(() => {
      // Load external stylesheets and fonts dynamically
  
      const preconnectLink = document.createElement('link');
      preconnectLink.href = 'https://fonts.gstatic.com/';
      preconnectLink.rel = 'preconnect';
      document.head.appendChild(preconnectLink);
  
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
  
      const fontAwesomeLink = document.createElement('link');
      fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      fontAwesomeLink.rel = 'stylesheet';
      document.head.appendChild(fontAwesomeLink);
  
      return () => {
        // Cleanup when component unmounts
        document.head.removeChild(fontLink);
        document.head.removeChild(fontAwesomeLink);
      };
    }, []); // Run only once on component mount
  
  const navigate = useNavigate();

  const goToStudent = () => {
      navigate('/Student');
  };

  const goToExternalParticipant = () => {
      navigate('/ExternalParticipant');
  };

  const goToOrganiser = () => {
      navigate('/Organiser');
  };

  const goToAdmin = () => {
      navigate('/Admin');
  };
  
  return (
    <div className={`${styles.background} ${styles.homePage}`} >
      <h1 > </h1>
      <form className={styles.homeForm}>
        <button className="btn" onClick={goToStudent}>Go to Student</button>
        <button className="btn" onClick={goToExternalParticipant}>Go to External Participant</button>
        <button className="btn" onClick={goToOrganiser}>Go to Organiser</button>
        <button className="btn" onClick={goToAdmin}>Go to Admin</button>
      </form>
    </div>
  );
  
  
};




const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Admin/Register" element={<AdminRegister />} />
          <Route path="/Admin/Login" element={<AdminLogin />} />
          <Route path="/Admin/AfterLogin" element={<AdminAfterLogin />} />

          <Route path="/Admin/AfterLogin/AddAdmin" element={<AdminAddAdmin />} />

          <Route path="/Admin/AfterLogin/EditEvents" element={<AdminEditEvents />} />
          <Route path="/Admin/AfterLogin/EditEvents/AddEvent" element={<AdminAddEvent />} />
          <Route path="/Admin/AfterLogin/EditEvents/ModifyEvent/:eventId" element={<AdminModifyEvent />} />

          <Route path="/Admin/AfterLogin/EditOrganisers" element={<AdminEditOrganisers />} />
          <Route path="/Admin/AfterLogin/EditOrganisers/AddOrganiser" element={<AdminAddOrganiser />} />
          <Route path="/Admin/AfterLogin/EditOrganisers/ModifyOrganiser/:organiserId" element={<AdminModifyOrganiser />} />

          <Route path="/Admin/AfterLogin/EditStudents" element={<AdminEditStudents />} />
          <Route path="/Admin/AfterLogin/EditStudents/AddStudent" element={<AdminAddStudent />} />
          <Route path="/Admin/AfterLogin/EditStudents/ModifyStudent/:studentId" element={<AdminModifyStudent />} />

          <Route path="/Admin/AfterLogin/EditExternalParticipants" element={<AdminEditExternalParticipants />} />
          <Route path="/Admin/AfterLogin/EditExternalParticipants/AddExternalParticipant" element={<AdminAddExternalParticipant />} />
          <Route path="/Admin/AfterLogin/EditExternalParticipants/ModifyExternalParticipant/:participantId" element={<AdminModifyExternalParticipant />} />

          {/* organiser */}
          <Route path="/Organiser" element={<OrganiserLogin />} />
          <Route path="/Organiser/Register" element={<OrganiserRegister />} />
          <Route path="/Organiser/Login" element={<OrganiserLogin />} />
          <Route path="/Organiser/AfterLogin" element={<OrganiserAfterLogin />} />
          <Route path="/Organiser/AfterLogin/EditEvents" element={<OrganiserEditEvents />} />
          <Route path="/Organiser/AfterLogin/EditEvents/ModifyEvent/:eventId" element={<OrganiserModifyEvent />} />

          <Route path="/Organiser/AfterLogin/ShowParticipants" element={<OrganiserShowParticipants />} />
          <Route path="/Organiser/AfterLogin/EditVolunteers" element={<OrganiserEditVolunteers />} />
     
          <Route path="/Student" element={<StudentLogin />} />
          <Route path="/Student/Register" element={<StudentRegister />} />
          <Route path="/Student/Login" element={<StudentLogin />} />
          <Route path="/Student/AfterLogin" element={<StudentAfterLogin />} />

          <Route path="/ExternalParticipant" element={<ExtLogin />} />
          <Route path="/Ext/Register" element={<ExtRegister />} />
          <Route path="/Ext/Login" element={<ExtLogin />} />
          <Route path="/Ext/AfterLogin" element={<ExtAfterLogin />} />

        </Routes>
      </Router>
    );
  };
  
  export default App;





