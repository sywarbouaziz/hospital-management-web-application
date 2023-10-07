const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "abcdefgejiklmnopqrstvughgfhfgh", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if(err.message==="email is required") {
    errors.email="Email is required";
  }
  if(err.message==="email format"){
    errors.email="Email : flenfouleni@string.string"
  }
  if(err.message==="password is required") {
    errors.password="Password is required";
  }
  if (err.message === "incorrect email") {
    errors.email = "Email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "Password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};


module.exports.registerPatient = async (req, res, next) => {
  try {
    const {email, password,phone,name,gender,description,image,date,status} = req.body;
    const role = "patient";
    if( !(/\S+@\S+\.\S+/.test(email))){
      throw Error("email format")
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password:hashedpassword,
      phone,
      name,
      gender,
      description,
      image,
      role,
      date,
      status
     
    });
   
    delete user.password;
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
module.exports.registerDoctor = async (req, res, next) => {
  try {
    const { email, password,phone,name,speciality,gender,image,service} = req.body;
    const role = "doctor";
    if( !(/\S+@\S+\.\S+/.test(email))){
      throw Error("email format")
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password:hashedpassword,
      phone,
      name,
      speciality,
      gender,
      image,
      role,
      service
     
    });
   
    delete user.password;
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if(!email){throw Error("email is required")}
    if(!password){throw Error ("password is required") }
    const user = await User.findOne({email});
    if (!user){
      throw  Error("incorrect email");
    }
    const auth = await bcrypt.compare(password,user.password);
    if(!auth){
    throw Error("incorrect password");
    }
    
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id,role:user.role, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};
//doctors
module.exports.getDoctors = async (req, res) => {
  try {
      const users = await User.find({role:"doctor"});
      res.json(users);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
}


//patients
module.exports.getPatients = async (req, res) => {
  try {
      const users = await User.find({role:"patient"});
      res.json(users);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
}

//usersbyid
module.exports.getUserById = async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      res.json(user);
  } catch (error) {
      res.status(404).json({message: error.message});
  }
}

//update doctor

module.exports.updateDoctor = async (req, res,next) => {
  try {
    const { service, password,phone,name,speciality,gender,image} = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
      const updateduser = await User.updateOne({_id:req.params.id}, {service:service, password:hashedPassword,phone:phone,name:name,speciality:speciality,gender:gender,image:image});
      res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
//update patient
module.exports.updatePatient = async (req, res,next) => {
  try {
    const {date, password,phone,name,gender,image,description,status} = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
      const updateduser = await User.updateOne({_id:req.params.id}, {date:date, password:hashedPassword,phone:phone,name:name,gender:gender,image:image,description:description,status:status});
      res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
//delete
module.exports.deleteUser = async (req, res) => {
  try {
      const deleteduser = await User.deleteOne({_id:req.params.id});
      res.status(200).json(deleteduser);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}

