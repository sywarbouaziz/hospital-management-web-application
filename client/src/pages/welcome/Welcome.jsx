import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import './welcome.css';

export default function Welcome() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
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
        } else
        {
            if(data.role==="admin")
          { navigate(`${data.role}`);}
          else{
          navigate(`${data.role}/${data.id}`);}
          
        }
        
      }
    };
    setTimeout(()=>verifyUser(), 1000);
   
  }, [cookies, navigate, removeCookie]);
  return (<div className="load">
    <div className="loading">
      <div className="text">
         Loading
      </div>
            
            </div>
    </div>)

}
