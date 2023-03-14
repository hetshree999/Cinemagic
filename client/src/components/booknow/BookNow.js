import React, { Component } from 'react'
import styles from './BookNow.module.css'

import { useState } from 'react'

const BookNow = () => {
  const path = window.location.pathname
  const array = path.split("/")
  console.log(array)

  const [seats, setSeats] = useState([])

  // const setValue = (e) => {
  //   let data = seats
  //   data.push(e.target.id)
  //   setSeats(data)
  //   console.log(seats)
  // }

  const seatValue = ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10",
                      "B1","B2","B3","B4","B5","B6","B7","B8","B9","B10",
                      "C1","C2","C3","C4","C5","C6","C7","C8","C9","C10",
                      "D1","D2","D3","D4","D5","D6","D7","D8","D9","D10",
                      "E1","E2","E3","E4","E5","E6","E7","E8","E9","E10",
                      "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10",
                      "G1","G2","G3","G4","G5","G6","G7","G8","G9","G10",
                      "H1","H2","H3","H4","H5","H6","H7","H8","H9","H10",
                      "I1","I2","I3","I4","I5","I6","I7","I8","I9","I10",
                      "J1","J2","J3","J4","J5","J6","J7","J8","J9","J10"]
                      
    const booked = ["A1","A2","B5","B6","B7"]
    const [seat, setSeat] = useState([])

    const getSeat = (e) => {
      const {value, checked} = e.target
      if(checked){
        setSeat([...seat, value])
      } else {
        setSeat(seat.filter((e) => e !== value))
      }
    }
    console.log(seat)

  const submitForm = (e) => {
    e.preventDefault()
    console.log(seat)

  }


  const display = seatValue.map((i) => {
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
        {/* <div className={styles.round}>
        <input className={styles.cb} type="checkbox" onChange={(e) => getSeat(e)} value={i} />
        <label htmlFor='checkbox'></label>
        </div> */}
      </div>
      )
    }
  })
    return (
      <div className={styles.maincontainer}>
        <h2>Movie: {array[2]}</h2>
        <h2>Theatre: {array[3].replace("%20", " ")}</h2>
        <h2>Time: {array[4]}</h2>
        <h2>Price: Rs.{array[5]}</h2>
        
        <div className={styles.screen}></div>
            <div className={styles.showcase}>
              <ul>
                <li>
                <div className={styles.seat}></div>
                <small>N/A</small>
                </li>
                <li>
                <div className={styles.seat}></div>
                <small>Selected</small>
                </li>
                <li>
                <div className={styles.seat}></div>
                <small>Booked</small>
                </li>
              </ul>
            </div>
            <div className={styles.seatform}>
            <form className={styles.seatForm}>
              <div className={styles.row1}>
              {display}
              </div>
            </form>
            </div>
        <div className={styles.booknow_Btn} type="submit" onClick={submitForm}><button>Book Now</button></div>
      </div>
    )
  }

export default BookNow