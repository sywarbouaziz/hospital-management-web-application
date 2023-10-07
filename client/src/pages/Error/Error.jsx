import React from 'react'
import { Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
 

const Error = () => {
    const navigate = useNavigate();

const homepage =()=>{
    navigate("/");
}
    return (<div className="load">
    <div className="loading">
      <div className="text">
         Error
         
      </div>
      <div >
<button onClick={homepage}>
    return 
</button>
         </div>
            </div>
    </div>)
}

export default Error;
