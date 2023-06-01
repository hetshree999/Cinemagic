import React, { useEffect } from 'react'
import Cards from '../card/Cards'
import Navbar from '../navbar/Navbar'
import styles from "./Home.module.css"
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Carousell from '../carousell/Carousell'
import Footer from '../footer/Footer'
import { useContext, useState } from 'react'
import { LoginContext } from '../ContextProvider/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const { logindata, setLoginData } = useContext(LoginContext);
  console.log(logindata)
  const [data, setData] = useState(false);


  const history = useNavigate();
  const DashboardValid = async () => {
   
    let token = localStorage.getItem("usersdatatoken");

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
      console.log("error page")
      history("*");
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/home");
    }    
}


useEffect(() => {
    setTimeout(() => {
        DashboardValid();
        setData(true)
    }, 2000)

},[])


  return (
    <>
      <div>
      <Navbar />
      {/* <div className={styles.container}>
        <h2>Book Tickets Online</h2>
        <p>book your favorite movie tickets from anywhere and at any time online,check showtimes and watch trailer of movies </p>
        <button className={styles.btn}>Book Now</button>
      </div> */}
      <div className={styles.home}>
            <div className={styles.hcontent}>
              <h5>Book Tickets</h5>
              <p>book your favorite movie tickets from anywhere and at any time online,check showtimes and watch trailer of movies 
              </p>
              {/* <NavLink to='/movies' className={styles.hbtn}>Book Now</NavLink> */}
              <NavLink to='/movies' style={{border:"2px solid black", width:"150px", height:"50px", textAlign:"center", color:"black", fontWeight:"500", fontSize:"20px",paddingTop:"8px"}}>Book Now</NavLink>
            </div>
            <div className={styles.himage}>
              <img src='./images/avengers.png'/>
            </div>
      </div>


      <Cards />
      <Carousell/>
      <Footer/>
      <ToastContainer />
    </div>
      {/* <Navbar />
      <div className={styles.container}>
        <h2>Book Tickets Online</h2>
        <p>book your favorite movie tickets from anywhere and at any time online,check showtimes and watch trailer of movies </p>
        <button className={styles.btn}>Book Now</button>
      </div>
      <Cards />
      <ToastContainer />  */}

    </>
  )
}

export default Home
