import "./Adddoctor.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import Check from "../welcome/Check";
const Updatedoctor = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [service, setService] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  Check("admin");
  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:4000/doctors/${id}`);
    setName(response.data.name);
    setService(response.data.service);
    setEmail(response.data.email);
    setGender(response.data.gender);
    setSpeciality(response.data.speciality);
    setPhone(response.data.phone);
    setImage(response.data.image);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:4000/doctors/${id}`, {
        name,
        gender,
        speciality,
        password,
        phone,
        image,
        service
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pat">
    <SideBar/>
    <div className="new">
      
      <div className="newContainer">
        <div className="top">
         update Doctor
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                image
              }
              alt=""
            />
            
          </div>
          <div className="right">
            <form onSubmit={updateUser}>
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
                  <label>Doctor full name</label>
                  <input type="text" placeholder="John doe" value={name}
                onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="formInput" >
                  <label>service</label>
                  <input type="text" placeholder="heart checkup" value={service}
                onChange={(e) => setService(e.target.value)} required/>
                </div>
                <div className="formInput" >
                  <span>Email</span>
                  <p>{email}</p>
                </div>
                <div className="formInput" >
                  <label>Phone</label>
                  <input type="number" placeholder="+216 12345678" value={phone}
                onChange={(e) => setPhone(e.target.value)}required/>
                </div>
                <div className="formInput" >
                  <label>Password</label>
                  <input type="text" placeholder="" value={password}
                onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="formInput" >
                  <label>Speciality</label>
                  <input type="text" placeholder=""value={speciality} onChange={(e) => setSpeciality(e.target.value)} required/>
                </div>
                
                  <div class="formInput">
                            <label>Gender</label>
                            <select required value={gender}
                onChange={(e) => setGender(e.target.value)}>
                                <option disabled selected>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                
                            </select>
            </div>
           
                       
                
              <button>update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Updatedoctor;
