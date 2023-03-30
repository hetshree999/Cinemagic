import React from 'react'
import { useState,useContext, useEffect } from 'react'
import styles from './BookNow.module.css'
import { LoginContext } from '../ContextProvider/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BookNow = () => {
  const navigate = useNavigate()
  const [booked, setBooked] = useState([])
  const [seat, setSeat] = useState([])
  const[nPrice, setnPrice] = useState()
  const[ePrice, setePrice] = useState()
  const[pPrice, setpPrice] = useState()
  const userid = localStorage.getItem("userid")

  const path = window.location.pathname
  const array = path.split("/")
  const movie = array[2]
  const theatre = array[3]
  const time = array[4]
  // const price = parseInt(array[5])
  const showdate = array[5]

  const getBookedSeat = async() => {
    const data = await fetch("http://localhost:5000/getBookedSeat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movie, theatre, time, showdate
      })
    })

    const res = await data.json()
    console.log(res)
    if(res.status === 201){
      if(res.seat === null)
      setBooked([])
      
      else{
        setBooked(res.seat.show[0].booked)
        setnPrice(res.seat.show[0].normalPrice)
        setePrice(res.seat.show[0].executivePrice)
        setpPrice(res.seat.show[0].premiumPrice)
      }
      // console.log(seat)
    }
  }

  console.log(nPrice)
  console.log(ePrice)
  console.log(pPrice)
  console.log(booked)

  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)
  const seatValue1 = ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10",
                      "B1","B2","B3","B4","B5","B6","B7","B8","B9","B10"]
  const seatValue2 = [
                      "C1","C2","C3","C4","C5","C6","C7","C8","C9","C10",
                      "D1","D2","D3","D4","D5","D6","D7","D8","D9","D10",
                      "E1","E2","E3","E4","E5","E6","E7","E8","E9","E10",
                      "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10",
                      "G1","G2","G3","G4","G5","G6","G7","G8","G9","G10",
                      "H1","H2","H3","H4","H5","H6","H7","H8","H9","H10"]

  const seatValue3 =  ["I1","I2","I3","I4","I5","I6","I7","I8","I9","I10",
                      "J1","J2","J3","J4","J5","J6","J7","J8","J9","J10"]
                      
    const getSeat = (e) => {
      const {value, checked} = e.target
      if(checked){
          setSeat([...seat, value])
          // setTotal(total+price)
          // setCount(count+1)
      } else {
        setSeat(seat.filter((e) => e !== value))
        // setCount(count-1)
      }
    }
    // console.log(count)
    // console.log(set)

  const submitForm = async(e) => {
    e.preventDefault()
    console.log(seat)

    if(seat.length === 0){
      toast.warning("Please select your seat!", {
        position: 'top-center'
      })
    }
    else{
      navigate("/pay", {
        state: {
          seat: seat,
          normalPrice: nPrice,
          executivePrice: ePrice,
          premiumPrice: pPrice,
          movie: movie,
          theatre: theatre,
          time: time,
          showdate: showdate
        },
      })
      // const data = await fetch("http://localhost:5000/addBooking", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     seat, movie, theatre, time, price, total, showdate, userid
      //   })
      // })

      // const res = await data.json()
      // console.log(res)

      // if(res.status === 201){
      //   toast.success("Booking confirmed!", {
      //     position: 'top-center'
      // });
      // }
  }
  }

  useEffect(() => {
    getBookedSeat()
  },[])

  const display = seatValue1.map((i) => {
    if(booked.includes(i)){
    return(
      <div className={styles.group}>
        <label>
          <input type="checkbox" disabled className={styles.booked}/>
          <span></span>
        </label>
      </div>
    )
    } else {
      return(
      <div className={styles.group}>
        <label>
          <input type="checkbox" onChange={(e) => getSeat(e)} value={i} />
          <span className={styles.booked}></span>
        </label>
      </div>
      )
    }
  })

  const display1 = seatValue2.map((i) => {
    if(booked.includes(i)){
    return(
      <div className={styles.group}>
        <label>
          <input type="checkbox" disabled className={styles.booked}/>
          <span></span>
        </label>
      </div>
    )
    } else {
      return(
      <div className={styles.group}>
        <label>
          <input type="checkbox" onChange={(e) => getSeat(e)} value={i} />
          <span className={styles.booked}></span>
        </label>
      </div>
      )
    }
  })

  const display2 = seatValue3.map((i) => {
    if(booked.includes(i)){
    return(
      <div className={styles.group}>
        <label>
          <input type="checkbox" disabled className={styles.booked}/>
          <span></span>
        </label>
      </div>
    )
    } else {
      return(
      <div className={styles.group}>
        <label>
          <input type="checkbox" onChange={(e) => getSeat(e)} value={i} />
          <span className={styles.booked}></span>
        </label>
      </div>
      )
    }
  })
    return (
      <div className={styles.maincontainer}>
        <h2>Movie: {movie.replace("%20", " ")}</h2>
        <h2>Theatre: {theatre.replace("%20", " ")}</h2>
        <h2>Time: {time}</h2>
        {/* <h2>Price: Rs.{price}</h2> */}
        <h2>Date: {showdate}</h2>
        
        <div className={styles.screen} ></div>
            <div className={styles.showcase}>
              <ul>
                <li>
                <div className={styles.seatf}></div>
                <small>N/A</small>
                </li>
                <li>
                <div className={styles.seats}></div>
                <small>Selected</small>
                </li>
                <li>
                <div className={styles.seatt}></div>
                <small>Booked</small>
                </li>
              </ul>
            </div>
            <div className={styles.seatform}>
            <form className={styles.seatForm}>
              <div className={styles.row1}>
              <center>
              <p style={{color:"black"}}>Normal-seat: {nPrice}₹</p>
              </center>
              {display}
              </div>
              <div className={styles.row1} style={{marginTop:"1rem"}}>
              <center>
              <p style={{color:"black"}}>Executive-seat: {ePrice}₹</p>
              </center>
              {display1}
              </div>
              <div className={styles.row1} style={{marginTop:"1rem"}}>
              <center>
              <p style={{color:"black"}}>Premium-seat: {pPrice}₹</p>
              </center>
              {display2}
              </div>
            </form>
            </div>
        <div className={styles.booknow_Btn} type="submit" onClick={submitForm}><button>Book Now</button></div>
        <ToastContainer />
      </div>
    )
  }

export default BookNow