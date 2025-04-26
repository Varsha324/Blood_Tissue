import React, { useEffect, useState } from 'react';
import './RecipientVerification.css';
import { getRecipient, updateRecipient, getDonor } from '../Api';

const RecipientVerification = () => {
  const [recipients, setRecipients] = useState([]);
  const [approvedDonors, setApprovedDonors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resRecipients = await getRecipient();
      const resDonors = await getDonor();
      setRecipients(resRecipients.data);
      setApprovedDonors(resDonors.data.filter(d => d.status === "Approved"));
    };

    fetchData();
  }, []);

  const handleAssignDonor = async (recipientId, donorId) => {
    try {
      await updateRecipient(recipientId, { assignedDonor: donorId });
      setRecipients(prev =>
        prev.map(r =>
          r._id === recipientId ? { ...r, assignedDonor: donorId } : r
        )
      );
    } catch (error) {
      console.error("Error assigning donor:", error);
    }
  };

  const handleStatusChange = async (recipientId, newStatus) => {
    try {
      await updateRecipient(recipientId, { status: newStatus });
      setRecipients(prev =>
        prev.map(r =>
          r._id === recipientId ? { ...r, status: newStatus } : r
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <div className="admin-navbar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="/donar-verification">Donor Verification</a></li>
          <li><a href="/recipient-verification" className="active">Recipient Verification</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </div>

      <div className='recipientverification-container'>
        <h1>RECIPIENT VERIFICATION</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Gender</th>
              <th>Location</th>
              <th>BloodGroup</th>
              <th>Requirement</th>
              <th>Urgency</th>
              <th>Hospital</th>
              <th>Allergy</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Medical Report</th>
              <th>Consent</th>
              <th>Information Accuracy</th>
              <th>Donor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((r) => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.age}</td>
                <td>{r.email}</td>
                <td>{r.contactNumber}</td>
                <td>{r.gender}</td>
                <td>{r.location}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.requiredTissueType?.join(", ")}</td>
                <td>{r.urgencyLevel}</td>
                <td>{r.hospitalName}</td>
                <td>{r.allergy}</td>
                <td>{r.height}</td>
                <td>{r.weight}</td>
                <td>
                  <a href={r.medicationPdfUrl} target="_blank" rel="noreferrer">View</a>
                </td>
                <td>{r.consent}</td>
                <td>{r.informationAccuracy}</td>
                <td>
                  <select
                    value={r.assignedDonor || ""}
                    onChange={(e) => handleAssignDonor(r._id, e.target.value)}
                  >
                    <option value="">-- Select Donor --</option>
                    {approvedDonors.map(donor => (
                      <option key={donor._id} value={donor._id}>
                        {donor.name} ({donor.bloodGroup})
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={r.status || "Pending"}
                    onChange={(e) => handleStatusChange(r._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipientVerification;
