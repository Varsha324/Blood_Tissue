const asyncHandler  = require("express-async-handler")
const Donor = require("../models/donormodels")

//get all donors
const getDonor = asyncHandler(async(req, res) => {
    const donors = await Donor.find();
    res.status(200).json(donors);
});

//create donors
const createDonors = asyncHandler(async (req, res) => {
  const {
    name, age, email, contactNumber, gender, location,
    chronic, bloodGroup, medicationPdfUrl, height, weight, typeOfDonation,
    consent, informationAccuracy
  } = req.body;

  // Check for required fields
  if (
    !name || !age || !email || !contactNumber || !gender || !location ||
    !chronic || !bloodGroup || !medicationPdfUrl || !height || !weight || !typeOfDonation ||
    !consent || !informationAccuracy
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // Create new donor
  const donor = await Donor.create({
    user_id: req.user.id,
    name, age, email, contactNumber, gender, location,
    chronic, bloodGroup, medicationPdfUrl, height, weight, typeOfDonation,
    consent, informationAccuracy
  });
  
    res.status(201).json(donor);
  });
  

//get a single donor
const getSingleDonor = asyncHandler(async(req,res)=>{
    const donor = await Donor.find({ user_id: req.user.id });
    if(!donor)
    {
        res.status(404);
        throw new Error("Donor not found");
    }
    res.status(200).json(donor);
});

//update donor
const updateDonor = asyncHandler(async (req, res) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    res.status(404);
    throw new Error("Donor not found");
  }

  const updatedDonor = await Donor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedDonor);
});

//delete donor
const deleteDonor = asyncHandler(async(req,res)=>
    {
        const donor = await Donor.findById(req.params.id);
        if(!donor)
        {
            res.status(404);
            throw new Error("Donor not found");
        }
        await Donor.remove();
        res.status(200).json({message:"donor is removed"});
    })

 
    
module.exports = {getDonor,createDonors,getSingleDonor,updateDonor,deleteDonor};