import "./Addpatient.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import Check from "../welcome/Check";

const Addpatient = () => {
    
    const navigate = useNavigate();
    Check("admin");
    const [image, setImage] = useState("https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg");
    const [name, setName] = useState("");
    const[status,setStatus]=useState("");
    const[date,setDate]=useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
 
    const generateError = (error) =>
      toast.error(error, {
        position: "bottom-right",
      });
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/registerpatient",
          {
            name,
            email,
            gender,
            description,
            password,
            phone,
            image,
            status,
            date
          },
          { withCredentials: true }
        );
        if (data) {
          if (data.errors) {
            const { email, password } = data.errors;
            if (email) generateError(email);
            else if (password) generateError(password);
          } else {
            navigate("/");
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    };
  return (
    <div className="pat">
      <SideBar/>
    <div className="new">
      
      <div className="newContainer">
        <div className="top">
          Add New Patient
        </div>
        <div className="bottom">
          <div className="left">
            
          <img
                  src={image}
              
            />
            <div class="formInput">
                  <textarea  rows="10" placeholder="Write something.." 
                onChange={(e) => setDescription(e.target.value)} required/></div>
             
          </div>
          <div className="right">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
              

                <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setImage(base64)}
        />
              </div>

              <div className="formInput" >
                  <label>Patient name</label>
                  <input type="text" placeholder="John_doe" 
                onChange={(e) => setName(e.target.value)} required/>
                </div>
                
                <div className="formInput" >
                <label>Email</label>
                  <input type="email" placeholder="john@gmail.com" 
                onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="formInput" >
                  <label>Phone</label>
                  <input type="number" placeholder="+216 12345678" 
                onChange={(e) => setPhone(e.target.value)}required/>
                </div>
                <div className="formInput" >
                  <label>Password</label>
                  <input type="text" placeholder="" 
                onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div class="formInput">
                            <label>Date of Birth</label>
                            <input type="date" placeholder="Date of Birth"  
                onChange={(e) => setDate(e.target.value)} required/>
                        </div>
                        <div class="formInput">
                            <label>Marital status</label>
                            <select required
                onChange={(e) => setStatus(e.target.value)}>
                                <option disabled selected>Select status</option>
                                <option>Single</option>
                                <option>Married</option>
                                
                            </select>
            </div>
                  <div class="formInput">
                            <label>Gender</label>
                            <select required 
                onChange={(e) => setGender(e.target.value)}>
                                <option disabled selected>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                
                            </select>
            </div>
           
                       
                
              <button>Add</button>
            </form>

          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default Addpatient;
