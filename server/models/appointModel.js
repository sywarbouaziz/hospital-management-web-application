const mongoose = require("mongoose");


const appointSchema = new mongoose.Schema({
  adate:{
    type:String,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
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
doctor:{
  type: String,
 
  
},

service:{
  type: String,
  
  
},
bdate:{
  type: String,
},

status:{
    type:String,
},
patient:{
    type:String
}

});

module.exports = mongoose.model("Appointments",  appointSchema);