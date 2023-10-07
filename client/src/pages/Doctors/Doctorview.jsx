import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Doctorview.css";
import { AiFillStar,AiOutlineStar } from "react-icons/ai";
import {Link, useParams } from "react-router-dom";
import Check from "../welcome/Check";
import SideBar from "../../components/Sidebar/SideBar";
export default function DoctorProfile() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [gender, setGender] = useState("");
const [experience, setExperience] = useState("");
const [speciality, setSpeciality] = useState("");
const [phone, setPhone] = useState("");
  const { id } = useParams();
Check("admin");
  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:4000/doctors/${id}`);
    setName(response.data.name);
    setExperience(response.data.experience);
    setEmail(response.data.email);
    setGender(response.data.gender);
    setSpeciality(response.data.speciality);
    setPhone(response.data.phone);
    setImage(response.data.image);
  };

  return (
	<div className="pat">
   <SideBar/>
    <div className="viewprofile">
      <div className="newContainer">
        <div className="top">Doctor {name}  </div>
        <div className="bottom">
          <div className="left">
            
          <img
                  src={image}
              
            />
             <div class="rating">
              <AiFillStar className="icon"/>
              <AiFillStar className="icon"/>
              <AiFillStar className="icon"/>
              <AiOutlineStar className="icon"/>
            </div>
             
          </div>
          <div className="right">
            <div className="f">
              

                <div className="formInput" >
                  <span>Doctor name: </span>
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
                  <span>Speciality</span>
                  <p>{speciality}</p>
                </div>
                <div className="formInput" >
                  <span>Experience</span>
                  <p>{experience}</p>
                </div>
                <div className="formInput" >
                  <span>Gender</span>
                  <p>{gender}</p>
                </div>
                
                  
                <Link to="/appointment">
              <button>BOOK</button>
              </Link>
			  </div>

          </div>
        </div>
      </div>
    </div>
    </div>

 

  );
}
//laoding page error page patient and doctor page login page more css dashboard css 