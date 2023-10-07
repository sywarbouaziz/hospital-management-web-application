import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointmentview.css";
import { AiFillStar,AiOutlineStar } from "react-icons/ai";
import {useParams } from "react-router-dom";
import Check from "../welcome/Check";
import SideBar from "../../components/Sidebar/SideBar";
const Appointmentview = () => {
    Check("admin");
    const [adate, setAdate] = useState("");
    const [name, setName] = useState("");
    const[status,setStatus]=useState("");
    const[doctor,setDoctor]=useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bdate, setBdate] = useState("");
  const [phone, setPhone] = useState("");
  const[service,setService]=useState("");
  const { id } = useParams();
  useEffect(() => {
    getAppointmentById();
  }, []);

  const getAppointmentById = async () => {
    const response = await axios.get(`http://localhost:4000/appointments/${id}`);
    setName(response.data.name);
   setAdate(response.data.adate);
   setStatus(response.data.status);
   setDoctor(response.data.doctor);
   setEmail(response.data.email);
   setGender(response.data.gender);
   setBdate(response.data.bdate);
   setPhone(response.data.phone);
   setService(response.data.service);
  };
  return (
    <div className='pat'>
      <SideBar/>
    <div className='body'> 
    <div className="container">
    <div className="title">Book Appointment</div>
    <div className="content">
      <div className='appof'>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full name</span>
            <p>{name}</p>
          </div>
          <div className="input-box">
                            <span>Marital status</span>
                            <p>{status}</p>
                        </div>
          <div className="input-box">
            <span className="details">Email</span>
            <p>{email}</p>
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <p>{phone}</p>
          </div>
          <div className="input-box">
                            <span>Date of Birth</span>
                            <p>{bdate}</p>
                        </div>
                        <div className="input-box">
                            <span>Doctor</span>
                            <p>{doctor}</p>
                        </div>
                        <div className="input-box">
                        <span className="input-box">Gender</span> 
            <p >{gender}</p>
                        </div>
                        <div className="input-box">
                            <span>Service</span>
                            <p>{service}</p>
                        </div>
                      
                       
        </div>
        <div className="details">
                        <span>Appointment Date</span>
                            <p><span className="contentof">{adate}</span></p>
                            </div>
       
          
       
          
        
        
      </div>
    </div>
  </div>
  </div>
  </div>
  
  )
}

export default Appointmentview;