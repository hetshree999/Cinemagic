import { Component } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../ContextProvider/Context";


const Navbar = () => {
    
    const { logindata, setLoginData } = useContext(LoginContext);

    // const handleLogout = () => {
    //     localStorage.removeItem("userdatatoken");
    //     // window.location.reload();
    //     window.location.href = ('/')
    // };
    const history = useNavigate();

    const handleLogout = async () => {
        let token = localStorage.getItem("usersdatatoken");

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
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }

    
        return(
            <div className="navbar-div">
            <header class="header">
                <a href="#" className="logo">Cinemagic </a>
                <nav className="navbar">
                    <div id="nav-close"></div>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/movies">Movies</NavLink>
                    <a href="#">Reviews</a>
                    <a href="#">Contact Us</a>
                    <a href="#">About Us</a>
                    <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                </nav>
            </header>
            </div>
        )
    }



export default Navbar;