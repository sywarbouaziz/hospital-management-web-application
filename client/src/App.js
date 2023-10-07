import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login/Login";
import Appointmentview from "./pages/Appointment/Appointmentview"
import "react-toastify/dist/ReactToastify.css";
import Doctors from "./pages/Doctors/Doctors"
import Patients from "./pages/Patients/Patients";
import Adddoctor from "./pages/Doctors/Adddoctor";
import Addpatient from "./pages/Patients/Addpatient";
import Appointment from "./pages/Appointment/Appointment"
import "./App.css"
import Updatedoctor from "./pages/Doctors/updateDoc";
import Dashboard from "./pages/Dashboard/Dashboard";
import Updatepatient from "./pages/Patients/updatepat";
import Error from "./pages/Error/Error";
import Welcome from "./pages/welcome/Welcome";

import Ppage from "./pages/Patient page/ppage";
import Dpage from "./pages/Doctor page/dpage";
import DoctorProfile from "./pages/Doctors/Doctorview";
import PatientProfile from "./pages/Patients/Patientview";
import DeditP from "./pages/Doctor page/Edit/Patientedit";
import Viewapp from "./pages/Doctor page/Edit/Viewapp";
import Appointmentpatient from "./pages/Patient page/Appointmentpatient";
export default function App() {

  return (
    <Router>
    
      <Routes>
        
        <Route exact path="/login" element={<Login />} />
        
        <Route path="*" element={< Error/>} />
        <Route path="/error" element={< Error/>} />
        <Route path="/" element={<Welcome/>}/>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/patient/appointment/:id" element={<Appointmentpatient/>}/>
        <Route path="doctor/edit/:id" element={<DeditP/>}/>
        <Route path="/doctor/view/:id" element={<Viewapp/>}/>
        <Route path="/doctors" element={<Doctors />} />
        
        
         <Route path="/patients" element={<Patients />} />
         
         <Route path="/registerdoctor" element={<Adddoctor/>}/>
        
       
         <Route path="/registerpatient" element={<Addpatient/>}/>
   


         <Route path="/appointment" element={<Appointment />} />
         <Route path="/appointments/view/:id" element={<Appointmentview/>}/>
         <Route path="/patients/edit/:id" element={<Updatepatient/>}/>
         <Route path="/doctors/edit/:id" element={<Updatedoctor/>}/>
         <Route path="/doctors/view/:id" element={<DoctorProfile/>}/>
         <Route path="/patients/view/:id" element={<PatientProfile/>}/>
        
         <Route path ="/doctor/:id" element={< Dpage />}/>
         
        
         <Route path ="/patient/:id" element={<Ppage/>}/>
         
      </Routes>
    </Router>
     
  );
}
