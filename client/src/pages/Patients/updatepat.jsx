import "./Addpatient.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import Check from "../welcome/Check";
const Updatepatient = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const[status,setStatus]=useState("");
    const[date,setDate]=useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);
  Check("admin");
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

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:4000/patients/${id}`, {
        name,
        gender,
        description,
        password,
        phone,
        image,
        status,
        date
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
         update Patient
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                image
              }
              alt=""
            />
             <div class="formInput">
                  <textarea name ="description" rows="10" placeholder="Write something.." value={description}
                onChange={(e) => setDescription(e.target.value)} required/></div>
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
                  <label>Patient name</label>
                  <input type="text" placeholder="John_doe" value={name}
                onChange={(e) => setName(e.target.value)} required/>
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
                <div class="formInput">
                            <label>Date of Birth</label>
                            <input type="date" placeholder="Date of Birth"  value={date}
                onChange={(e) => setDate(e.target.value)} required/>
                        </div>
                        <div class="formInput">
                            <label>Marital status</label>
                            <select required value={status}
                onChange={(e) => setStatus(e.target.value)}>
                                <option disabled selected>Select status</option>
                                <option>Single</option>
                                <option>Married</option>
                                
                            </select>
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

export default Updatepatient;
