
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css'
import {FaHospitalAlt,FaHospitalUser,FaUserMd} from "react-icons/fa";
import { Link } from "react-router-dom";
import SideBar from '../../components/Sidebar/SideBar'
import Check from "../welcome/Check";


const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const[appointments,setAppointment]=useState([]);
Check("admin");


  useEffect(() => {
    getDoctors();
    getPatients();
    getAppointments();
  }, []);

  const getDoctors = async () => {
    const response = await axios.get("http://localhost:4000/doctors");
    
    setDoctors(response.data);

  };
  const getPatients = async () => {
    const response = await axios.get("http://localhost:4000/patients");
    setPatients(response.data);
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
      <div className="home">
         <SideBar/>
         <div className="homeContainer">
         <div className="widgets">
      <div className="widget">
      <div className="left">
        <div className="title">Income</div>
        <div className="counter">
         {patients.length*50} $
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
      <div className="widget">
      <div className="left">
        <div className="title">Doctors</div>
        <div className="counter">
          {doctors.length}
        </div>
        <Link to="/doctors" style={{ textDecoration: "none" }}>
        <div className="link">link</div>
        </Link>
      </div>
      <div className="right">
       
        
          <FaUserMd
            className="icon"
            style={{
   
              color: "goldenrod",
            }}
          />
          </div>
        
      </div>
      <div className="widget">
      <div className="left">
        <div className="title">Patients</div>
        <div className="counter">
          {patients.length}
        </div>
        <Link to="/patients" style={{ textDecoration: "none" }}>
        <div className="link">link</div>
        </Link>
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
    <div className="appointmenttable">
        
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Service</th>
              <th>Appointment Date</th>
              <th>Status</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <td>{index + 1}</td>
                <td>{appointment.name}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.service}</td>
			        	<td>{appointment.adate}</td>
                <td>{appointment.patient}</td>
                
                
                  <td >
                  <Link
                    to={`/appointments/view/${appointment._id}`}
                    
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

      )
}

export default Dashboard;
