import React, { useState } from "react";
import "./AddDonar.css";
import { createDonors } from "../Api.js";
import Navbar from "./Navbar.jsx"; // ✅ Corrected import

const AddDonor = () => {
  const [donor, setDonor] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    email: "",
    contactNumber: "",
    gender: "",
    location: "",
    chronic: "",
    height: "",
    weight: "",
    consent: "",
    informationAccuracy: "",
    medicationPdfUrl: "",
    typeOfDonation: [],
  });

  const [medicalReport, setMedicalReport] = useState(null);

  const donationOptions = [
    "Blood",
    "Plasma",
    "Platelets",
    "Bone Marrow",
    "Cornea",
    "Skin",
    "Heart Valves",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor({ ...donor, [name]: value });
  };

  const handleDonationTypeChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setDonor({ ...donor, typeOfDonation: options });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMedicalReport(file);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Pdf = "";
    if (medicalReport) {
      try {
        base64Pdf = await convertToBase64(medicalReport);
      } catch (err) {
        alert("Failed to convert PDF");
        return;
      }
    }

    const donorData = {
      ...donor,
      medicationPdfUrl: base64Pdf,
    };

    try {
      await createDonors(donorData);
      alert("Donor Registered Successfully!");

      setDonor({
        name: "",
        age: "",
        bloodGroup: "",
        email: "",
        contactNumber: "",
        gender: "",
        location: "",
        chronic: "",
        height: "",
        weight: "",
        consent: "",
        informationAccuracy: "",
        medicationPdfUrl: "",
        typeOfDonation: [],
      });
      setMedicalReport(null);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to add donor");
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-donor-container">
        <h2 className="form-heading">Register Donor</h2>
        <form onSubmit={handleSubmit} className="donor-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={donor.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={donor.age}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={donor.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={donor.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Preferred Location"
            value={donor.location}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={donor.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="bloodGroup"
            value={donor.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={donor.height}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={donor.weight}
            onChange={handleChange}
            required
          />

          <select
            name="chronic"
            value={donor.chronic}
            onChange={handleChange}
            required
          >
            <option value="">Chronic Disease?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            name="consent"
            value={donor.consent}
            onChange={handleChange}
            required
          >
            <option value="">Consent to Donate?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            name="informationAccuracy"
            value={donor.informationAccuracy}
            onChange={handleChange}
            required
          >
            <option value="">Confirm Information Accuracy</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Not Confirmed">Not Confirmed</option>
          </select>

          <label>Select Type(s) of Donation</label>
          <select
            name="typeOfDonation"
            multiple
            value={donor.typeOfDonation}
            onChange={handleDonationTypeChange}
            required
          >
            {donationOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label className="file-label">Upload Medical Report (PDF only)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file-input"
            required
          />

          <button type="submit" className="submit-button">
            Add Donor
          </button>
        </form>
      </div>
    </>
  );
};

export default AddDonor;
