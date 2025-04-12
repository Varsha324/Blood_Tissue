import React, { useState } from "react";
import "./Recipient.css";
import { createRecipients } from "../Api.js";

const AddRecipient = () => {
  const [recipient, setRecipient] = useState({
    name: "", 
    age: "", 
    email: "", 
    contactNumber: "",
    gender: "", 
    location: "",  
    bloodGroup: "", 
    requiredTissueType: [], 
    urgencyLevel: "",
    hospitalName: "", 
    allergy: "", 
    height: "", 
    weight: "",
    consent: "", 
    informationAccuracy: "", 
    medicationPdfUrl: ""
  });

  const [prescriptionFile, setPrescriptionFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipient({ ...recipient, [name]: value });
  };

  const handleRequirementTypeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, opt => opt.value);
    setRecipient({ ...recipient, requiredTissueType: selectedOptions });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPrescriptionFile(file);
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
    if (prescriptionFile) {
      try {
        base64Pdf = await convertToBase64(prescriptionFile);
      } catch (err) {
        alert("Failed to convert PDF");
        return;
      }
    }

    const recipientData = {
      ...recipient,
      medicationPdfUrl: base64Pdf
    };

    try {
      await createRecipients(recipientData);
      alert("Recipient Registered Successfully!");
      setRecipient({
        name: "", 
        age: "", 
        email: "", 
        contactNumber: "",
        gender: "", 
        location: "",  
        bloodGroup: "", 
        requiredTissueType: [], 
        urgencyLevel: "",
        hospitalName: "", 
        allergy: "", 
        height: "", 
        weight: "",
        consent: "", 
        informationAccuracy: "", 
        medicationPdfUrl: ""
      });
      setPrescriptionFile(null);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to add recipient");
    }
  };

  return (
    <div className="add-recipient-container">
      <h2 className="form-heading">Register Recipient</h2>
      <form onSubmit={handleSubmit} className="recipient-form">
        <input type="text" name="name" placeholder="Name" value={recipient.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={recipient.age} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={recipient.email} onChange={handleChange} required />
        <input type="text" name="contactNumber" placeholder="Contact Number" value={recipient.contactNumber} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Preferred Location" value={recipient.location} onChange={handleChange} required />

        <select name="gender" value={recipient.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select name="bloodGroup" value={recipient.bloodGroup} onChange={handleChange} required>
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

        <label>Select Required Tissue Type(s)</label>
        <select
          name="requiredTissueType"
          multiple
          value={recipient.requiredTissueType}
          onChange={handleRequirementTypeChange}
          required
        >
          <option value="Blood">Blood</option>
  <option value="Plasma">Plasma</option>
  <option value="Platelets">Platelets</option>
  <option value="Bone Marrow">Bone Marrow</option>
  <option value="Cornea">Cornea</option>
  <option value="Skin">Skin</option>
  <option value="Heart Valves">Heart Valves</option>
  <option value="Other">Other</option>
        </select>

        <select name="urgencyLevel" value={recipient.urgencyLevel} onChange={handleChange} required>
          <option value="">Select Urgency Level</option>
          <option value="Emergency">Emergency</option>
          <option value="Urgent">Urgent</option>
          <option value="Normal">Normal</option>
        </select>

        <input type="text" name="hospitalName" placeholder="Hospital Name" value={recipient.hospitalName} onChange={handleChange} required />
        <input type="text" name="allergy" placeholder="Allergy (if any)" value={recipient.allergy} onChange={handleChange} required />
        <input type="number" name="height" placeholder="Height (cm)" value={recipient.height} onChange={handleChange} required />
        <input type="number" name="weight" placeholder="Weight (kg)" value={recipient.weight} onChange={handleChange} required />

        <select name="consent" value={recipient.consent} onChange={handleChange} required>
          <option value="">Consent to Receive Donation?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select name="informationAccuracy" value={recipient.informationAccuracy} onChange={handleChange} required>
          <option value="">Confirm Information Accuracy</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Not Confirmed">Not Confirmed</option>
        </select>

        <label className="file-label">Upload Medical PDF (PDF only)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
          required
        />

        <button type="submit" className="submit-button">Add Recipient</button>
      </form>
    </div>
  );
};

export default AddRecipient;
