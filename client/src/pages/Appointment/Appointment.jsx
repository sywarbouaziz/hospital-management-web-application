
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import SideBar from '../../components/Sidebar/SideBar';
import { ToastContainer, toast } from "react-toastify";
import "./Appointment.css";
import Check from "../welcome/Check";
const Appointment = () => {
  const navigate = useNavigate();
    Check("admin");
    const [users, setUser] = useState([]);
    const [adate, setAdate] = useState("");
    const [name, setName] = useState("");
    const[status,setStatus]=useState("");
    const[doctor,setDoctor]=useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bdate, setBdate] = useState("");
  const [phone, setPhone] = useState("");
  const[service,setService]=useState("");
  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    const response = await axios.get("http://localhost:4000/doctors");
    
    setUser(response.data);

  };
    const generateError = (error) =>
      toast.error(error, {
        position: "bottom-right",
      });
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/appointment",
          {
            name,
            email,
            gender,
            bdate,
            phone,
            adate,
            status,
            doctor,
            service
          },
          { withCredentials: true }
        );
        if (data) {
          if (data.errors) {
            const { email, appointment,service } = data.errors;
            if (email) generateError(email);
            else if (appointment) generateError(appointment);
            else if (service) generateError(service);
          } else {
            navigate("/");
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    };


  return(
    <div className='pat'>
      <SideBar/>
    <div className='body'> 
    <div className="container">
    <div className="title">Book Appointment</div>
    <div className="content">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full name</span>
            <input type="text" placeholder="Full name" onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div className="input-box">
                            <label>Marital status</label>
                            <select onChange={(e) => setStatus(e.target.value)} required>
                                <option disabled selected>Select</option>
                                <option>Single</option>
                                <option>Married</option>
                            </select>
                        </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input type="number" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} required/>
          </div>
          <div className="input-box">
                            <label>Date of Birth</label>
                            <input type="date" placeholder="Enter birth date" onChange={(e) => setBdate(e.target.value)} required/>
                        </div>
                        <div className="input-box">
                            <label>Doctor</label>
                           <select onChange={(e) => setDoctor(e.target.value)} required>
                           <option disabled selected>Select Doctor</option>
                            {users.map((user) => (
                              <>
               
                                <option key={user._id}>{user.name}</option>
                                </>))}
                            </select>
                        </div>
                        <div className="input-box">
                            <label>Appointment Date</label>
                            <input type="date" placeholder="Appointment Date" onChange={(e) => setAdate(e.target.value)} required/>
                        </div>
                        <div className="input-box">
                            <label>Service</label>
                            <select onChange={(e) => setService(e.target.value)} required>
                                <option disabled selected>Select Service</option>
                                {users.map((user) => (
                              <>
               
                                <option key={user._id}>{user.service}</option>
                                </>))}
                            </select>
                        </div>
        </div>
       
        <div className="gender-details">
          <input type="radio" name="gender" value="male" id="dot-1" onChange={(e) => setGender(e.target.value)}/>
          <input type="radio" name="gender" value="female" id="dot-2" onChange={(e) => setGender(e.target.value)}  />
          
          <span className="gender-title">Gender</span>
          <div className="category">
            <label for="dot-1">
            <span className="dot one"></span>
            <span className="gender">Male</span>
          </label>
          <label for="dot-2">
            <span className="dot two"></span>
            <span className="gender">Female</span>
          </label>
          </div>
        </div>
        
        <div className="button">
          <input type="submit" value="Register"/>
        </div>
      </form>
    </div>
  </div>
  </div>
  <ToastContainer /></div>
  );
};

export default Appointment;
