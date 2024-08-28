import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/adminAfterLogin.css';

const AdminAfterLogin = () => {
    return (
        <div className="adminAfterLogin_container_">
            <div className="adminAfterLogin_header_">
                <h1>Welcome Admin</h1>
            </div>
            <div className="adminAfterLogin_center_">
                <table className="adminAfterLogin_table_">
                    <tbody>
                        {/* <tr>
                            <td className="adminAfterLogin_td_">
                                <Link to="/Admin/AfterLogin/AddAdmin" className="adminAfterLogin_button_">Add Admin</Link>
                            </td>
                        </tr> */}
                        <tr>
                            <td className="adminAfterLogin_td_">
                                <Link to="/Admin/AfterLogin/EditEvents" className="adminAfterLogin_button_">Edit Events</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="adminAfterLogin_td_">
                                <Link to="/Admin/AfterLogin/EditOrganisers" className="adminAfterLogin_button_">Edit Organisers</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="adminAfterLogin_td_">
                                <Link to="/Admin/AfterLogin/EditStudents" className="adminAfterLogin_button_">Edit Students</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="adminAfterLogin_td_">
                                <Link to="/Admin/AfterLogin/EditExternalParticipants" className="adminAfterLogin_button_">Edit ExternalParticipants</Link>
                            </td>
                        </tr>

                        <tr>
                            <td className="adminAfterLogin_td_">
                                <Link to="/" className="adminAfterLogin_button_">Log out</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAfterLogin;
