import React, { useEffect } from 'react'
import Cards from '../card/Cards'
import Navbar from '../navbar/Navbar'
import styles from "./Home.module.css"


const Home = () => {
const userValid = async()=>{
  let token = localStorage.getItem("userdatatoken")
  console.log(token)
}

useEffect(()=>{
  userValid();
},[])

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
            <h2>Yeh Jawani Hai Deewani</h2>
            <p>A story of the exhilarating and terrifying journey of four characters as they navigate through their youth; from their carefree laughter as they set off on a holiday together in their college days, until their bittersweet tears as they watch the first of their bunch get married.</p>
            <button className={styles.btn}>Book Now</button>
      </div>
      <Cards />
    </div>
  )
}

export default Home
