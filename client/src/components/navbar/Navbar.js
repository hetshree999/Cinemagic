import { Component } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";



class Navbar extends Component{

    handleLogout = () => {
        localStorage.removeItem("token");
        // window.location.reload();
        window.location.href = ('/')
    };

    render(){
        return(
            <div className="navbar-div">
            <header class="header">
                <a href="#" className="logo">Cinemagic </a>
                <nav className="navbar">
                    <div id="nav-close"></div>
                    <a href="#">Home</a>
                    <NavLink to="/movies">Movies</NavLink>
                    <a href="#">Reviews</a>
                    <a href="#">Contact Us</a>
                    <a href="#">About Us</a>
                    <NavLink to="/" onClick={this.handleLogout}>Logout</NavLink>
                </nav>
            </header>
            </div>
        )
    }
}


export default Navbar;