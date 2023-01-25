import { Component } from "react";
import "./navbar.css";

class Navbar extends Component{
    render(){
        return(
            <div className="navbar-div">
            <header class="header">
                <a href="#" className="logo">Cinemagic </a>
                <nav className="navbar">
                    <div id="nav-close"></div>
                    <a href="#">Home</a>
                    <a href="#">Movies</a>
                    <a href="#">Reviews</a>
                    <a href="#">Contact Us</a>
                    <a href="#">About Us</a>
                    <a href="#">Logout</a>
                </nav>
            </header>
            </div>
        )
    }
}


export default Navbar;