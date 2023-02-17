import React, { useEffect } from 'react'
import Cards from '../card/Cards'
import Navbar from '../navbar/Navbar'
import styles from "./Home.module.css"
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { LoginContext } from '../ContextProvider/Context'

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
    // console.log(data)
    if (data.status === 401 || !data) {
      console.log("error page")
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dash");
    }    
}


useEffect(() => {
    setTimeout(() => {
        DashboardValid();
        setData(true)
    }, 2000)

}, [])


  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2>Book Tickets Online</h2>
        <p>book your favorite movie tickets from anywhere and at any time online,check showtimes and watch trailer of movies </p>
        <button className={styles.btn}>Book Now</button>
      </div>
      <Cards />
    </div>
  )
}

export default Home
