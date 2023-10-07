import Check from '../welcome/Check';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ppage.css"
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {FaHospitalAlt,FaHospitalUser,FaUserMd} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
const Ppage = () => {
  Check("patient");
  const[appointments,setAppointment]=useState([]);
  const [image, setImage] = useState("");
  const [email,setEmail]=useState("");
  const[users,setUser]=useState([]);
  const [name, setName] = useState("");
  const { id } = useParams();
  useEffect(() => {
    getDoctors();
    getUserById();
    getAppointments();
  }, []);

  const getDoctors = async () => {
    const response = await axios.get("http://localhost:4000/doctors");
    
    setUser(response.data);

  };
  const getUserById = async () => {
    const response = await axios.get(`http://localhost:4000/patient/${id}`);
    setName(response.data.name);
    setImage(response.data.image);
    setEmail(response.data.email)
  };
  const getAppointments= async () => {
    const response = await axios.get("http://localhost:4000");
    setAppointment(response.data);
  };

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
  return (
    <div className='home'>
    <div className="homeContainer">
    <div className="widgetsdoctor">
 <div className="widget">
 <div className="left">
   <div className="title">Book Appointment</div>
   <div className="counter">
   </div>
   <Link to={`/patient/appointment/${id}`} style={{ textDecoration: "none" }}>
        <div className="link">book</div>
        </Link>
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
   <div className="title">Patient {name}</div>
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
   <div className="title">Doctors</div>
   <div className="counter">
   {users.length}
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
  <div className="dpageappp">
        
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Speciality</th>
              <th>Service</th>
              
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
                <td>{user.speciality}</td>
                <td>{user.service}</td>
                
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dpageappp2">
   
   <table>
     <thead>
       <tr>
         <th>No</th>
         <th>Doctor Name</th>
         <th>Service</th>
         <th>Appointment Date</th>
      
       </tr>
     </thead>
     <tbody>
       {appointments.filter(appointment => appointment.email===email).map((appointment, index) => (
         <tr key={appointment._id}>
           <td>{index + 1}</td>
           <td>{appointment.doctor}</td>
           <td>{appointment.service}</td>
           <td>{appointment.adate}</td>

         </tr>
       ))}
     </tbody>
   </table>
 </div>

 </div>
</div>
       
</div>

  )
}

export default Ppage;
