import React from 'react'
import { useNavigate } from 'react-router-dom';
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
  <a href="#"class="icon-a"><i class="fa fa-sign-out"></i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout</a>
  <a href="#"class="icon-a"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Show</a>
  {/* <a href="#"class="icon-a"><i class="fa fa-list icons"></i> &nbsp;&nbsp;Projects</a>
  <a href="#"class="icon-a"><i class="fa fa-shopping-bag icons"></i> &nbsp;&nbsp;Orders</a>
  <a href="#"class="icon-a"><i class="fa fa-tasks icons"></i> &nbsp;&nbsp;Inventory</a>
  <a href="#"class="icon-a"><i class="fa fa-user icons"></i> &nbsp;&nbsp;Accounts</a>
  <a href="#"class="icon-a"><i class="fa fa-list-alt icons"></i> &nbsp;&nbsp;Tasks</a> */}
</div>
<div className='tmain'>
<h1>Dashboard</h1>
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


<div className="coldiv8">
		<div className="box8">
		<div className="contentbox">
			<p>Added Movies</p>
			<br/>
			<table>
  <tr>
    <th>Movie Name</th>
    <th>Cinema</th>
    <th>Showtime</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>ABC</td>
    <td>ABC</td>
    <td>ABC</td>
    <td>ABC</td>
  </tr>
  <tr>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
  </tr>
  <tr>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
  </tr>
  <tr>
  <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
  </tr>
  <tr>
  <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
  </tr>
  <tr>
  <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
  </tr>
</table>
		</div>
	</div>
	</div>

    </div>
  )
}

export default Thome
