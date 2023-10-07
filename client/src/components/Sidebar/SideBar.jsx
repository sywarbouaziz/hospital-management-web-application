
import { NavLink,useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaUser ,FaHospitalUser} from "react-icons/fa";
import { useCookies } from "react-cookie";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { AiFillSchedule,AiOutlineLogout } from "react-icons/ai";
import {GiDoctorFace} from "react-icons/gi";
import { useState,useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import "./Sidebar.css";
import { Link } from "react-router-dom";


const SideBar = () => {
 
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
    <div className="sidebar">
      
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">LUCID</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <FaHome  className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to="/appointment" style={{ textDecoration: "none" }}>
            <li>
              <AiFillSchedule className="icon" />
              <span>Appointment</span>
            </li>
          </Link>
          <Link to="/doctors" style={{ textDecoration: "none" }}>
            <li>
              <GiDoctorFace className="icon" />
              <span>Doctors</span>
            </li>
          </Link>
          <Link to="/patients" style={{ textDecoration: "none" }}>
            <li>
              <FaHospitalUser className="icon" />
              <span>Patients</span>
            </li>
          </Link>
          
        
          
          
         
       
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={logout} >Logout</span>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default SideBar;