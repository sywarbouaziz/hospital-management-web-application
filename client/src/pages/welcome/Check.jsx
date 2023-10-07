import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Check(user) {
  const [role,setRole]=useState("");
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
          setRole(data.role);
          if (data.role!=user)
          {
            navigate("/error")
          }
          
        }
        
      }
    };
    verifyUser();
   
  }, [cookies, navigate, removeCookie,role]);

}
