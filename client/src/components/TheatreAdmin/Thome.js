import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext, useState } from 'react'
import Tnavbar from '../Tnav/Tnavbar'
import { LoginContext } from '../ContextProvider/Context'
import './thome.css'
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

  const handleLogout = async () => {
    let token = localStorage.getItem("tadmindatatoken");
  
    const res = await fetch("http://localhost:5000/tlogout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
        }
    });
  
    const data = await res.json();
    console.log(data);
  
    if (data.status == 201) {
        console.log("use logout");
        localStorage.removeItem("tadmindatatoken");
        setLoginData(false)
        history("/tlogin");
    } else {
        console.log("error");
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
        {/* // <Tnavbar user={user}/> */}
        <div id="mySidenav" class="sidenav">
	<p class="logo">Cinemagic</p>
  <a href="#" class="icon-a"><i class="fa fa-dashboard icons"></i> &nbsp;&nbsp;Dashboard</a>
  <a href="#"class="icon-a"><i class="fa fa-users icons"></i> &nbsp;&nbsp;Customers</a>
  <NavLink to="/addShow" class="icon-a"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Show</NavLink>
  <NavLink to="/tlogin" class="icon-a"><i class="fa fa-sign-out" onClick={handleLogout}></i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout</NavLink>
  
  {/* <a href="#"class="icon-a"><i class="fa fa-list icons"></i> &nbsp;&nbsp;Projects</a>
  <a href="#"class="icon-a"><i class="fa fa-shopping-bag icons"></i> &nbsp;&nbsp;Orders</a>
  <a href="#"class="icon-a"><i class="fa fa-tasks icons"></i> &nbsp;&nbsp;Inventory</a>
  <a href="#"class="icon-a"><i class="fa fa-user icons"></i> &nbsp;&nbsp;Accounts</a>
  <a href="#"class="icon-a"><i class="fa fa-list-alt icons"></i> &nbsp;&nbsp;Tasks</a> */}
</div>
<div className='tmain'>
<h1>Theatre Admin</h1>
<div className='coldiv3'>
<div className="box">
			<h2>12<br/> <span>Customers</span></h2>
			<i className="fa fa-users boxicon"></i>
		</div>
    <div className="box">
			<h2>8<br/> <span>Movies</span></h2>
			<i className="fa fa-film boxicon"></i>
		</div>
    <div className="box">
			<h2>5<br/> <span>Theateradmins</span></h2>
			<i className="fa fa-user-circle-o boxicon"></i>
		</div>
    </div>
</div>




    </div>
  )
}

export default Thome
