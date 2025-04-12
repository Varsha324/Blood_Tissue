const mongoose = require("mongoose")

const recipientSchema = mongoose.Schema({
    user_id:
    {
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:"User"
    },
    name:{
        type:String,
        required: [true,"Please enter the name"],
    },
    age:{
        type:Number,
        required:[true,"Please enter the age"]
    },
    email:{
        type:String,
        required:[true,"Please enter the email address"]
    },
    contactNumber:{
        type:String,
        required:[true,"Please enter the contact number"]
    },
    gender:
    {
        type:String,
        required:[true,"Please enter the gender"]
    },
    height:{
        type:Number,
        required:[true,"Please enter the height"]
       },
       weight:{
           type:Number,
           required:[true,"Please enter the height"]
          },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        required: true
    },
    requiredTissueType: {
        type: [String],  
        enum: ['Blood', 'Plasma', 'Platelets', 'Bone Marrow', 'Cornea', 'Skin', 'Heart Valves', 'Other'],
        required: true
    },
    urgencyLevel: {
        type: String,
        enum: ['Emergency', 'Urgent', 'Normal'],
        required: [true, "Please enter the urgency level"],
    },

    hospitalName:{
        type:String,
        required: [true, "Please enter the hospital name"],
    },
    allergy:{
        type:String,
        required: [true, "Please enter the allergy if preseent"],
    },
    location:
    {
        type:String,
        required: [true, "Please enter the preferable location"],
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
      medicationPdfUrl: {
        type: String,
        required: true,
      },
      assignedDonor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor",
        default: null,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
      }
      

})

module.exports = mongoose.model("Recipient",recipientSchema);