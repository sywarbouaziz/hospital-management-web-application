import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import"./edit.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import Check from "../../welcome/Check";
const DeditP = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const[status,setStatus]=useState("");
    const[date,setDate]=useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);
  Check("doctor");
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

        gender,
        description,
        status,

      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="load">
    <div className="editpage">
      
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

                <div className="formInput" >
                  <span>Patient name</span>
                 <p>{name}</p>
                </div>
                
                <div className="formInput" >
                  <span>Email</span>
                  <p>{email}</p>
                </div>
                <div className="formInput" >
                  <label>Phone</label>
                  <p>{phone}</p>
                  </div>
                <div class="formInput">
                            <span>Date of Birth</span>
                            <p>{date}</p>
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

export default DeditP;
