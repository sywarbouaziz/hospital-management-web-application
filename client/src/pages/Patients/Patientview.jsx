import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Patientview.css";
import { AiFillStar,AiOutlineStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Check from "../welcome/Check";
import SideBar from "../../components/Sidebar/SideBar";
export default function PatientProfile() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const[status,setStatus]=useState("");
  const[date,setDate]=useState("");
const [email, setEmail] = useState("");
const [gender, setGender] = useState("");
const [description, setDescription] = useState("");
const [phone, setPhone] = useState("");
  const { id } = useParams();
Check("admin");
  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:4000/patients/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
    setDescription(response.data.description);
    setPhone(response.data.phone);
    setImage(response.data.image);
    setDate(response.data.date);
    setStatus(response.data.status);
  };

  return (
	<div className="pat">
   <SideBar/>
    <div className="viewprofile">
      <div className="newContainer">
        <div className="top">Patient {name}  </div>
        <div className="bottom">
          <div className="left">
            
          <img
                  src={image}
              
            />
            <div className="formInput" >
                  <span>Description</span>
                  <p> {description}</p>
                </div>
             
          </div>
          <div className="right">
            <div className="f">
              

                <div className="formInput" >
                  <span>Patient name: </span>
                  <p>{name}</p>
                </div>
                <div className="formInput" >
                  <span>Email</span>
                  <p>{email}</p>
                </div>
                <div className="formInput" >
                  <span>Phone</span>
                  <p>{phone}</p>
                </div>
                <div className="formInput" >
                  <span>Date of birth</span>
                  <p>{date}</p>
                </div>
                <div className="formInput" >
                  <span>Gender</span>
                  <p>{gender}</p>
                </div>
                <div className="formInput" >
                  <span>Marital status</span>
                  <p>{status}</p>
                </div>
                
                
                
                  
                
             
			  </div>

          </div>
        </div>
      </div>
    </div>
    </div>

 

  );
}
//laoding page error page patient and doctor page login page more css dashboard css 