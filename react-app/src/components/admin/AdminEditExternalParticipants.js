import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/adminExternalParticipants.css' ;

const ExternalParticipantManagement = () => {
  const [approvedParticipants, setApprovedParticipants] = useState([]);
  const [unapprovedParticipants, setUnapprovedParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExternalParticipants();
  }, []);

  const fetchExternalParticipants = async () => {
    try {
      const response = await fetch('http://localhost:5000/api4/externalparticipants');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Separate participants into approved and unapproved lists
      const approved = data.filter(participant => participant.approved);
      const unapproved = data.filter(participant => !participant.approved);
      setApprovedParticipants(approved);
      setUnapprovedParticipants(unapproved);
    } catch (error) {
      console.error('Error fetching external participants:', error);
    }
  };

  const handleApproveExternalParticipant = async (participantId) => {
    try {
      const response = await fetch(`http://localhost:5000/api4/approveExternalParticipant/${participantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Update the participant's approved status in the local state
      const updatedParticipants = approvedParticipants.map(participant =>
        participant.id === participantId ? { ...participant, approved: true } : participant
      );
      setApprovedParticipants(updatedParticipants);
      alert('External Participant approved successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error approving external participant:', error);
      alert('Failed to approve external participant. Please try again later.');
    }
  };

  const handleDeclineExternalParticipant = async (participantId) => {
    try {
      const response = await fetch(`http://localhost:5000/api4/deleteExternalParticipant/${participantId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the declined participant from the list
      setUnapprovedParticipants(prevParticipants => prevParticipants.filter(participant => participant.id !== participantId));
      alert('External Participant declined successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error declining external participant:', error);
      alert('Failed to decline external participant. Please try again later.');
    }
  };

  const handleAddExternalParticipant = () => {
    // Redirect to add external participant page
    navigate('/Admin/AfterLogin/EditExternalParticipants/AddExternalParticipant');
  };

  return (
    // <div>
    //   <h2>Approved External Students</h2>
    //   <ul>
    //     {approvedParticipants.map((participant) => (
    //       <li key={participant.id}>
    //         {participant.name}
    //       </li>
    //     ))}
    //   </ul>
      
    //   <h2>Unapproved External Students</h2>
    //   <ul>
    //     {unapprovedParticipants.map((participant) => (
    //       <li key={participant.id}>
    //         {participant.name}
    //         <button onClick={() => handleApproveExternalParticipant(participant.id)}>Approve</button>
    //         <button onClick={() => handleDeclineExternalParticipant(participant.id)}>Decline</button>
    //       </li>
    //     ))}
    //   </ul>

    //   <button onClick={handleAddExternalParticipant}>Add External Participant</button>
    // </div>

    <div class="adminExternalParticipant_div_">
    <h2 class="adminExternalParticipant_h2_">Approved External Participant</h2>
    <table class="adminExternalParticipant_table_approved_">
        <thead>
            <tr>
                <th class="adminExternalParticipant_th_approved_"> Name</th>
                <th class="adminExternalParticipant_th_approved_">College Name</th>
            </tr>
        </thead>
        <tbody>
            {approvedParticipants.map((participant) => (
            <tr key={participant.id}>
                <td class="adminExternalParticipant_td_approved_">{participant.name}</td>
                <td class="adminExternalParticipant_td_approved_">{participant.college_name}</td>
            </tr>
            ))}
        </tbody>
    </table>
    
    <h2 class="adminExternalParticipant_h2_">Unapproved External Participant</h2>
    <table class="adminExternalParticipant_table_unapproved_">
        <thead>
            <tr>
                <th class="adminExternalParticipant_th_unapproved_"> Name</th>
                <th class="adminExternalParticipant_th_unapproved_">College Name</th>
                <th class="adminExternalParticipant_th_unapproved_"> Gmail</th>
                <th class="adminExternalParticipant_th_unapproved_"> Gender</th>
                <th class="adminExternalParticipant_th_unapproved_"> Hall</th>
                <th class="adminExternalParticipant_th_unapproved_"> Food</th>
                <th class="adminExternalParticipant_th_unapproved_">Actions</th>
            </tr>
        </thead>
        <tbody>
            {unapprovedParticipants.map((participant) => (
            <tr key={participant.id}>
                <td class="adminExternalParticipant_td_unapproved_">{participant.name}</td>
                <td class="adminExternalParticipant_td_unapproved_">{participant.college_name}</td>
                <td class="adminExternalParticipant_td_unapproved_">{participant.gmail}</td>
                <td class="adminExternalParticipant_td_unapproved_">{participant.gender}</td>
                <td class="adminExternalParticipant_td_unapproved_">{participant.hall}</td>
                <td class="adminExternalParticipant_td_unapproved_">{participant.food}</td>
                <td class="adminExternalParticipant_td_unapproved_">
                    <button class="adminExternalParticipant_button_" onClick={() => handleApproveExternalParticipant(participant.id)}>Approve</button>
                    <button class="adminExternalParticipant_button_" onClick={() => handleDeclineExternalParticipant(participant.id)}>Decline</button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>

    {/* <button class="adminExternalParticipant_button_add_" onClick={handleAddExternalParticipant}>Add External Participant</button> */}
</div>

  );
};

export default ExternalParticipantManagement;
