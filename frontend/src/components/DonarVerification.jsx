import React, { useEffect, useState } from 'react';
import './DonarVerification.css';
import { getDonor, updateDonor } from '../Api';

const DonarVerification = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await getDonor();
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  const handleStatusChange = async (donorId, newStatus) => {
    try {
      await updateDonor(donorId, { status: newStatus });
      setDonors((prevDonors) =>
        prevDonors.map((donor) =>
          donor._id === donorId ? { ...donor, status: newStatus } : donor
        )
      );
    } catch (error) {
      console.error("Error updating donor status:", error);
    }
  };

  return (
    <div>
      <div className="admin-navbar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="/donar-verification" className="active">Donor Verification</a></li>
          <li><a href="/recipient-verification">Recipient Verification</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </div>

      <div className='donarverification-container'>
        <h1>DONOR VERIFICATION</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Chronic</th>
              <th>Blood Group</th>
              <th>Medical Report</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Donation</th>
              <th>Consent</th>
              <th>Info Accuracy</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id}>
                <td>{donor.name}</td>
                <td>{donor.age}</td>
                <td>{donor.email}</td>
                <td>{donor.contactNumber}</td>
                <td>{donor.gender}</td>
                <td>{donor.location}</td>
                <td>{donor.chronic}</td>
                <td>{donor.bloodGroup}</td>
                <td>
                  <a href={donor.medicationPdfUrl} target="_blank" rel="noopener noreferrer">
                    View Report
                  </a>
                </td>
                <td>{donor.height}</td>
                <td>{donor.weight}</td>
                <td>{donor.typeOfDonation?.join(", ")}</td>
                <td>{donor.consent}</td>
                <td>{donor.informationAccuracy}</td>
                <td>
                  <select
                    value={donor.status || "Pending"}
                    onChange={(e) => handleStatusChange(donor._id, e.target.value)}
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

export default DonarVerification;
