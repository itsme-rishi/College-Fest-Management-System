// app.js or server.js
const express = require('express');
const app = express();

// const pool = require('./database');

const pool = require('./db');
// admin pages
const routes1 = require('./routes/admin_routes/AdminLogin');
const routes2 = require('./routes/admin_routes/AdminRegister');
const routes3 = require('./routes/admin_routes/AdminPendingAdmins');
const routes4 = require('./routes/admin_routes/AdminEditEvents');
const routes5 = require('./routes/admin_routes/AdminEditOrganisers');
const routes6 = require('./routes/admin_routes/AdminEditStudents');
const routes7 = require('./routes/admin_routes/AdminEditExternalParticipants');
const routes411 = require('./routes/init_schemas');
const route_student_register = require('./routes/student_routes/StudentRegister');
const route_student_login = require('./routes/student_routes/StudentLogin');
const route_student_after_login = require('./routes/student_routes/StudentAfterLogin');
const route_student_after_login_particiapte_event = require('./routes/student_routes/ParticipateEvent');
const route_student_after_login_volunteer_event = require('./routes/student_routes/VolunteerEvent');
const route_student_after_login_event_winners = require('./routes/student_routes/EventWinners');

const route_ext_register = require('./routes/ext_routes/ExtRegister');
const route_ext_login = require('./routes/ext_routes/ExtLogin');
const route_ext_after_login = require('./routes/ext_routes/ExtAfterLogin');
const route_ext_after_login_particiapte_event = require('./routes/ext_routes/ParticipateEvent');
const route_ext_after_login_event_winners = require('./routes/ext_routes/EventWinners');

// sathya

// admin pages
// const routes1 = require('./routes/AdminLogin');
// const routes2 = require('./routes/AdminRegister');
// const routes3 = require('./routes/AdminPendingAdmins');
// const routes4 = require('./routes/admin_routes/AdminEditEvents');
// const routes5 = require('./routes/AdminEditOrganisers');
// const routes6 = require('./routes/AdminEditStudents');
// const routes7 = require('./routes/AdminEditExternalParticipants');

// organiser pages
const routes8 = require('./routes/organiser_routes/OrganiserRegister');
const routes9 = require('./routes/organiser_routes/OrganiserLogin');
const routes10 = require('./routes/organiser_routes/OrganiserEvent');
const routes11 = require('./routes/organiser_routes/OrganiserParticipants');
const routes12 = require('./routes/organiser_routes/OrganiserVolunteers');

// sathya


const cors = require('cors');
app.use(cors());


app.use(express.json()); // Middleware to parse JSON bodies

// admin pages
app.use('/api/login', routes1);
app.use('/api/register', routes2);
app.use('/api', routes3);
app.use('/api1', routes4);
app.use('/api2', routes5);
app.use('/api3', routes6);
app.use('/api4', routes7);

app.use('/', routes411);
app.use('/student/register',route_student_register);
app.use('/student/login',route_student_login);
app.use('/student/afterlogin',route_student_after_login);
app.use('/student/afterlogin/participate_event',route_student_after_login_particiapte_event);
app.use('/student/afterlogin/volunteer_event',route_student_after_login_volunteer_event);
app.use('/student/afterlogin/event_winners', route_student_after_login_event_winners);


app.use('/ext/register',route_ext_register);
app.use('/ext/login',route_ext_login);
app.use('/ext/afterlogin',route_ext_after_login);
app.use('/ext/afterlogin/participate_event',route_ext_after_login_particiapte_event);
app.use('/ext/afterlogin/event_winners', route_ext_after_login_event_winners);

// sathya

// admin pages
// app.use('/api/login', routes1);
// app.use('/api/register', routes2);
// app.use('/api', routes3);
app.use('/api1', routes4);
// app.use('/api2', routes5);
// app.use('/api3', routes6);
// app.use('/api4', routes7);

// organiser pages
app.use('/api/organiser/register', routes8);
app.use('/api/organiser/login' , routes9);
app.use('/api5', routes10);
app.use('/api6', routes11);
app.use('/api7', routes12);

// sathya

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// connect to the pg data base
const { Pool } = require('pg');




 