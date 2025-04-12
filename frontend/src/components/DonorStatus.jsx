import React, { useEffect, useState } from "react";
import "./DonorStatus.css";
import { getSingleDonor } from "../Api"; // Adjust this import path if needed

const DonorStatus = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDonor = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await getSingleDonor(userId);
        setDonors(response.data); // ✅ no wrapping — already an array
      } catch (error) {
        console.error("Error fetching donor data:", error);
      }
    };

    fetchDonor();
  }, []);

  const filteredDonors = donors.filter((donor) =>
    donor.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="donor-search">
        <h1>Donor Status</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="donor-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>Organ Donated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <tr key={donor._id}>
                  <td>{donor.name}</td>
                  <td>{donor.age}</td>
                  <td>{donor.gender}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.typeOfDonation?.join(", ")}</td>
                  <td>{donor.status || "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No donors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorStatus;
