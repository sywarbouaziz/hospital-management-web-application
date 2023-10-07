import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Doctors.css";
import SideBar from '../../components/Sidebar/SideBar'
import Check from "../welcome/Check";
const Doctors = () => {
  const [users, setUser] = useState([]);
  Check("admin");
  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    const response = await axios.get("http://localhost:4000/doctors");
    
    setUser(response.data);

  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/doctors/${id}`);
      getDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pat">
      <SideBar/>
    <div className="bodo">
    <div className="con">
        <div className="addnew">
    <div className="title"> Doctors </div>
    <div className="lll">
      <Link
                    to={"/registerdoctor"}
                    
                  >
                    <button
                    >
                    add new doctor
                    </button>
                  
                  </Link>
    </div>
    </div>
      <div className="header_fixed">
        
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Speciality</th>
              <th colSpan="3">Actions</th>
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
                
                <td >
                  <Link
                    to={`edit/${user._id}`}
                    
                  >
                     <button>
                    Edit
                  </button>
                  </Link>
                  </td>
                  <td >
                  <Link
                    to={`view/${user._id}`}
                    
                  >
                  
                  <button>
                    view
                  </button>
                  </Link>
                  </td>
                  <td >
                  <button
                    onClick={() => deleteUser(user._id)}
                    
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
};

export default Doctors;
