import React, { useEffect, useState } from 'react';
import './RecipientStatus.css';
import { getSingleDRecipient } from '../Api'; // Adjust the path if needed

const RecipientStatus = () => {
  const [recipients, setRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipients = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const res = await getSingleDRecipient(userId);
        setRecipients(res.data); // ✅ no wrapping — already an array
      } catch (error) {
        console.error("Error fetching recipient:", error);
      }
    };

    fetchRecipients();
  }, []);

  const filteredRecipients = recipients.filter((r) =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="recipient-search">
        <h1>Recipient Status</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="recipient-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>Requirements</th>
              <th>Status</th>
              <th>Donor</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipients.length > 0 ? (
              filteredRecipients.map((recipient) => (
                <tr key={recipient._id}>
                  <td>{recipient.name}</td>
                  <td>{recipient.age}</td>
                  <td>{recipient.gender}</td>
                  <td>{recipient.bloodGroup}</td>
                  <td>{recipient.requiredTissueType?.join(", ")}</td>
                  <td>{recipient.status || 'Pending'}</td>
                  <td>{recipient.assignedDonor?.name || 'Not Assigned'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No recipients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipientStatus;
