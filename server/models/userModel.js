const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  gender:{
    type: String,
    required: [true, "Gender is Required"],
    
},
name:{
  type: String,
  required: [true, "name is Required"],
  
},
phone:{
  type: Number,
  required: [true, "Number is Required"],
  
},
service:{
  type: String,
 
  
},

speciality:{
  type: String,
  
  
},
role: {
  type: String
},
description:{
  type: String,
},
image:{
  type: String
},
date:{
  type: String
},
status:{
  type:String
}

});

module.exports = mongoose.model("Users", userSchema);