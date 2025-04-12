const mongoose = require("mongoose") 

const userSchema = mongoose.Schema({
    name:
    {
        type:String,
        required:[true,"Please enter the name"]
       
    },

    email:{
    type:String,
    required : [true,"Please enter the email address"] ,
    unique: [true,"Email id already exists"]
    
},
    password:
    {
        type:String,
        required:[true,"Please enter the valid password"]
    },
    
    role: 
    { type: String, 
        enum: ["user", "admin"], 
        default: "user" }
},

{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema);