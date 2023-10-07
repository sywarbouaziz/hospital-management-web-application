import "./Adddoctor.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import Check from "../welcome/Check";
//updatring
const Adddoctor = () => {
    
    const navigate = useNavigate();
    Check("admin");
    const [image, setImage] = useState("https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg");
    const [name, setName] = useState("");
    const[service,setService]=useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const[speciality,setSpeciality]=useState("");
    const generateError = (error) =>
      toast.error(error, {
        position: "bottom-right",
      });
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/registerdoctor",
          {
            name,
            email,
            gender,
            password,
            phone,
            image,
            service,
            speciality
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
        <div className="top">Add New Doctor</div>
        <div className="bottom">
          <div className="left">
            
          <img
                  src={image}
              
            />
             
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
                  <label>Doctor name</label>
                  <input type="text" placeholder="John_doe" onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="formInput" >
                  <label>service</label>
                  <input type="String" placeholder="heart check" onChange={(e) => setService(e.target.value)} required/>
                </div>
                
                <div className="formInput" >
                  <label>Email</label>
                  <input type="email"  placeholder="johndoe@gmail.com" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="formInput" >
                  <label>Phone</label>
                  <input type="number" placeholder="+216 12345678" onChange={(e) => setPhone(e.target.value)}required/>
                </div>
                <div className="formInput" >
                  <label>Password</label>
                  <input type="text" placeholder="" onChange={(e) => setPassword(e.target.value)}required/>
                </div>
                <div className="formInput" >
                  <label>Speciality</label>
                  <input type="text" placeholder="" onChange={(e) => setSpeciality(e.target.value)} required/>
                </div>
                
                  <div class="formInput">
                            <label>Gender</label>
                            <select  required onChange={(e) => setGender(e.target.value)} >
                                <option disabled selected>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                
                            </select>
                        </div>
                
              <button>Send</button>
            </form>

          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default Adddoctor;
