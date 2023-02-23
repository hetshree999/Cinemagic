import { Component } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../ContextProvider/Context";


const Tnavbar = (props) => {
    
    const { logindata, setLoginData } = useContext(LoginContext);

    // const handleLogout = () => {
    //     localStorage.removeItem("userdatatoken");
    //     // window.location.reload();
    //     window.location.href = ('/')
    // };
    const history = useNavigate();

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
        return(
            <div className="navbar-div">
            <header class="header">
                <a href="#" className="logo">Welcome {props.user} </a>
                <nav className="navbar">
                    <div id="nav-close"></div>
                    <NavLink to="/dash">Home</NavLink>
                    {/* <NavLink to="/addShow">Add Show</NavLink> */}
                    <NavLink to="/addShow" state={{name:"isha"}}>Add Show</NavLink>
                    <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                </nav>
            </header>
            </div>
        )
    }



export default Tnavbar;