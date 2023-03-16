import React from 'react'
import '../TheatreAdmin/thome.css'
import { useNavigate, NavLink } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { LoginContext } from '../ContextProvider/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDash = () => {

  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata)
  
  const [data, setData] = useState(false);
  const [users, setUsers] = useState(0)
  const [movies, setMovies] = useState(0)
  const [theatreAdmins, setTheatreAdmins] = useState(0)

  const history = useNavigate();
  const DashboardValid = async () => {
   
    let token = localStorage.getItem("admindatatoken");

    const res = await fetch("http://localhost:5000/validuser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });

    const data = await res.json();
    console.log(data)
    if (data.status === 401 || !data) {
      history("*");
    } else {
      setLoginData(data)
      history("/adminDash");
    }    
}

const getData = async() => {
  const res = await fetch("http://localhost:5000/adminDash", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await res.json()
  console.log(data)
  if(data.status === 201){
    // users = data.userCount
    console.log(data.userCount)
    setUsers(data.userCount)
    setMovies(data.movieCount)
    setTheatreAdmins(data.tadminCount)
  }
  // console.log(users)
}
const handleLogout = async () => {
  let token = localStorage.getItem("admindatatoken");

  const res = await fetch("http://localhost:5000/logout", {
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
      localStorage.removeItem("admindatatoken");
      setLoginData(false)
      history("/");
  } else {
      console.log("error");
  }
}


useEffect(() => {
    setTimeout(() => {
        getData();
        DashboardValid();
        setData(true)
        
    })

}, [])

  return (
    <div>
      <div id="mySidenav" class="sidenav">
	<p class="logo">Cinemagic</p>
  <a href="#" class="icon-a"><i class="fa fa-dashboard icons"></i> &nbsp;&nbsp;Dashboard</a>
  <a href="#"class="icon-a"><i class="fa fa-users icons"></i> &nbsp;&nbsp;Customers</a>
  <NavLink to="/adminHome" class="icon-a"><i class="fa fa-users icons"></i> &nbsp;&nbsp;Show request</NavLink>
  <NavLink to="/" class="icon-a" onClick={handleLogout}><i class="fa fa-sign-out"></i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout</NavLink>
  <NavLink to="/addMovie" class="icon-a"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Show</NavLink>
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
			<h2>{users}<br/> <span>Users</span></h2>
			<i className="fa fa-users boxicon"></i>
		</div>
    <div className="box">
			<h2>{movies}<br/> <span>Movies</span></h2>
			<i className="fa fa-film boxicon"></i>
		</div>
    <div className="box">
			<h2>{theatreAdmins}<br/> <span>Theateradmins</span></h2>
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

export default AdminDash
