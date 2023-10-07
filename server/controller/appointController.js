const Appointment = require("../models/appointModel");
const User = require("../models/userModel");

const handleErrors = (err) => {
  let errors = { email:"",appointment:"",service:"" };

  console.log(err);
  if(err.message==="email is required") {
    errors.email="Email is required";
  }
  if(err.message==="email format"){
    errors.email="Email : flenfouleni@string.string"
  }
  if(err.message==="doctor is required") {
    errors.appointment="Doctor is required";
  }
  if (err.message === "service is required") {
    errors.service = "Service is required";
  }

  if (err.message === "incorrect service") {
    errors.appointment = "Service and Doctor don't match up";
  }

  return errors;
};


module.exports.registerAppointment = async (req, res, next) => {
  try {
    const {email,phone,name,gender,doctor,adate,bdate,status,service} = req.body;
    if(!email){throw Error("email is required")}
    if( !(/\S+@\S+\.\S+/.test(email))){
      throw Error("email format")
    }
    const user = await User.findOne({email});
    if(user){
         patient="registred patient";
    }
    else {
       patient="non-registered patient";
    }
    if(!doctor){throw  Error("doctor is required")}
    if(!service){throw Error ("service is required")}
    const doc = await User.findOne({name:doctor});
    if(!doc.service){throw Error("doctor doesn't have service")}
    if(doc.service!=service){throw Error("incorrect service")}
    const appointment = await Appointment.create({
        email,
        phone,
        name,
        gender,
        doctor,
        adate,
        bdate,
        status,
        service,
        patient
     
    });

    res.status(201).json({ appointment: appointment._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};



module.exports.getAppointments = async (req, res) => {
  try {
      const appointments = await Appointment.find();
      res.json(appointments);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
}




module.exports.getAppointmentById = async (req, res) => {
  try {
      const appointment = await Appointment.findById(req.params.id);
      res.json(appointment);
  } catch (error) {
      res.status(404).json({message: error.message});
  }
}



//delete
module.exports.deleteAppointment = async (req, res) => {
  try {
      const deleteappointment = await Appointment.deleteOne({_id:req.params.id});
      res.status(200).json(deleteappointment);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}

