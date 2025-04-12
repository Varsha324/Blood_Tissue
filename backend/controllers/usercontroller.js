const asyncHandler= require("express-async-handler");
const User = require("../models/usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signUpUser = asyncHandler(async (req,res)=>{
    const {name,email,password,role} = req.body;
    if(!name||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
 
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists")
    }

    //hashpassword
    const hashedPassword = await bcrypt.hash(password , 10);
   
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: req.body.role || "user"
    });
    
    if(user){
        res.status(201).json({_id : user.id, email:user.email})
    }
    else{
        req.status(400)
        throw new Error("User data not valid")
    }
});
 

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password)
    {
      res.status(400);
      throw new Error("All fields are mandatory");  
    }
    const user = await User.findOne({email});
    //comapare password with hashed password

     if(user&&(await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                name : user.name,
                email: user.email,
                id : user.id,
                role: user.role
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30m"}
    )
        res.status(200).json({accessToken, role:user.role})
     }
     else{
        res.status(401)
        throw new Error("Email or Password is not valid");
     }

})

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
   })
   

module.exports = {signUpUser,loginUser,currentUser}