import Check from '../welcome/Check'
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dpage.css"
import { useCookies } from "react-cookie";
import axios from "axios";
import {FaHospitalAlt,FaHospitalUser,FaUserMd} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Dpage = () => {
  const [image, setImage] = useState("");
  const[users,setUser]=useState([]);
  const[appointments,setAppointment]=useState([]);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [gender, setGender] = useState("");
const [experience, setExperience] = useState("");
const [speciality, setSpeciality] = useState("");
const [phone, setPhone] = useState("");
  const { id } = useParams();
Check("doctor");
  useEffect(() => {
    getUserById();
    getPatients();
    getAppointments();
    deleteAppointment();
  }, []);
  const navigate = useNavigate();
 
 
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } ;
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:4000/doctor/${id}`);
    setName(response.data.name);
    setImage(response.data.image);
  };
 

  const getPatients = async () => {
    const response = await axios.get("http://localhost:4000/patients");
    setUser(response.data);
  };
  const getAppointments= async () => {
    const response = await axios.get("http://localhost:4000");
    setAppointment(response.data);
  };
  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/appointments/${id}`);
      getAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='home'>
    <div className="homeContainer">
    <div className="widgetsdoctor">
 <div className="widget">
 <div className="left">
   <div className="title">Income</div>
   <div className="counter">
   {appointments.filter(appointment => appointment.doctor===name).length*50} $
   </div>
 
   <div className="link"></div>
 </div>
 <div className="right">
   
     <FaHospitalAlt
       className="icon"
       style={{
        
         color: "goldenrod",
       }}
     />
     </div>
   
 </div>
 <div className="widgetdoctor">
 <div className="left">
   <div className="title">Doctor {name}</div>
   <div className="counter">
 
   <img
                  src={image}
              
            />
          
          <button className='logoutbutton' onClick={logout}>
            Log Out
          </button>
       
         
             
   </div>
   
  
 </div>
   
 </div>
 <div className="widget">
 <div className="left">
   <div className="title">Appointments</div>
   <div className="counter">
   {appointments.filter(appointment => appointment.doctor===name).length}
   </div>
   <div className="link"></div>
 </div>
 <div className="right">
  
   
     <FaHospitalUser
       className="icon"
       style={{
         
         color: "goldenrod",
       }}
     />
     </div>
   
 </div>
</div>
<div className='tables'>
  <div className="dpageapp">
        
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td> 
                <img
                  src={user.image}
              
            /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                
                
                  <td >
                    <Link to={`/doctor/edit/${user._id}`}>
                  <button
                    
                    
                  >
                    edit
                  </button>
                  </Link>
                  </td>
                 
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
<div className="dpageapp2">
   
   <table>
     <thead>
       <tr>
         <th>No</th>
         <th>Patient Name</th>
         <th>Service</th>
         <th>Appointment Date</th>
         <th>Status</th>
         <th colSpan="2">Actions</th>
       </tr>
     </thead>
     <tbody>
       {appointments.filter(appointment => appointment.doctor===name).map((appointment, index) => (
         <tr key={appointment._id}>
           <td>{index + 1}</td>
           <td>{appointment.name}</td>
           <td>{appointment.service}</td>
           <td>{appointment.adate}</td>
           <td>{appointment.patient}</td>
           
           
             <td >
             <Link
               to={`/doctor/view/${appointment._id}`}
               
             >
             
             <button>
               view
             </button>
             </Link>
             </td>
             <td >
             <button onClick={() => deleteAppointment(appointment._id)}
               
             >
               Delete
             </button>
             </td>
            
           
         </tr>
       ))}
     </tbody>
   </table>
 </div>
 </div>
</div>
       
</div>

  );
}

export default Dpage
