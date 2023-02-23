import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext, useState } from 'react'
import Tnavbar from '../Tnav/Tnavbar'
import { LoginContext } from '../ContextProvider/Context'
import './thome.module.css'

const Thome = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    console.log(logindata)
    const [user, setUser] = useState('')
    const [data, setData] = useState(false);

    const history = useNavigate();
    const DashboardValid = async () => {
      let token = localStorage.getItem("tadmindatatoken");
  
      const res = await fetch("http://localhost:5000/validadmin", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });
  
      const data = await res.json();
      console.log(data)
      if (data.status === 401 || !data) {
        console.log("error page")
        history("*");
      } else {
        console.log("user verify");
        setLoginData(data)
        setUser(data.ValidUserOne.tname)
        history("/thome");
      }    
  }
  
  
  useEffect(() => {
      setTimeout(() => {
          DashboardValid();
          setData(true)
      })
  
  }, [])
  

  return (
    <div>
        <Tnavbar user={user}/>
    </div>
  )
}

export default Thome
