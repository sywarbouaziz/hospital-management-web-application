const { Router } = require("express");
const {login, getUserById, deleteUser,getDoctors,registerDoctor,updateDoctor,getPatients,registerPatient,updatePatient} = require("../controller/userController");
const { checkUser } = require("../Middleware/Middleware");
const{registerAppointment,getAppointments,getAppointmentById,deleteAppointment}=require("../controller/appointController")
const router = require("express").Router();
router.post("/", checkUser); 
router.get("/",getAppointments);
router.post("/appointment",registerAppointment);
router.post("/patient/appointment/:id",registerAppointment);
router.post("/registerdoctor", registerDoctor);
router.post("/registerpatient", registerPatient);
//
router.post("/login", login);
router.get('/patients', getPatients);
router.get('/', getPatients);
router.get('/patients/:id',getUserById);
router.get('/patient/:id',getUserById);
router.get('/patient/appointment/:id',getUserById);
router.get('/appointments/:id',getAppointmentById);
router.patch('/patients/:id', updatePatient);
router.delete('/patients/:id', deleteUser);
router.delete('/appointments/:id', deleteAppointment);
//
router.get('/doctors', getDoctors);
router.get('/', getDoctors);
router.get('/doctors/:id',getUserById);
router.get('/doctor/:id',getUserById);
router.patch('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteUser);

module.exports = router;