const mongoose = require("mongoose");

const donorSchema = mongoose.Schema({
  user_id:
    {
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:"User"
    },
  name: {
    type: String,
    required: [true, "Please enter the name"],
  },
  age: {
    type: Number,
    required: [true, "Please enter the age"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email address"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please enter the contact number"],
  },
  gender: {
    type: String,
    required: [true, "Please enter the gender"],
  },
  height: {
    type: Number,
    required: [true, "Please enter the height"],
  },
  weight: {
    type: Number,
    required: [true, "Please enter the weight"],
  },
  chronic: {
    type: String,
    required: [true, "Please enter the chronic disease"],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    required: true,
  },
  medicationPdfUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: [true, "Please enter the preferable location"],
  },
  typeOfDonation: {
    type: [String],
    enum: ['Blood', 'Plasma', 'Platelets', 'Bone Marrow', 'Cornea', 'Skin', 'Heart Valves', 'Other'],
    required: true,
  },
  consent: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  informationAccuracy: {
    type: String,
    enum: ['Confirmed', 'Not Confirmed'],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }
  
});

module.exports = mongoose.model("Donor", donorSchema);
