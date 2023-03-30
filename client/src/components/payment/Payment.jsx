import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import styles from "./payment.module.css"

const Payment = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const seat = location.state.seat
    let total = 0

    const display = seat.map((i) => {
      const seatVal = i.split("")
      const val = seatVal[0]
      let price
      if(val === "A" || val === "B"){
        price = location.state.normalPrice
        total += price
      } 
      else if(val === "I" || val === "J"){
        price = location.state.premiumPrice
        total += price
      }
      else{
        price = location.state.executivePrice
        total += price
      }
      return(
        <>
        <div className={styles.ticket}>
          <p>Movie: {location.state.movie}</p>
          <p>Theatre: {location.state.theatre.replace("%20", " ")}</p>
          <p>Seat: {i}</p>
          <p>Date: {location.state.showdate}</p>
          <p>Time: {location.state.time}</p>
          <p>Price: {price} ₹</p>
        </div>
        </>
      )
    })
    let amount = total + 50

    const handlePay = () => {
      navigate("/finalpay", {
        state: {
          seat: location.state.seat,
          movie: location.state.movie,
          theatre: location.state.theatre,
          showdate: location.state.showdate,
          time: location.state.time,
          normalPrice: location.state.normalPrice,
          executivePrice: location.state.executivePrice,
          premiumPrice: location.state.premiumPrice,
          total: amount,
        }
      })
    }

    const handleCancle = () => {
      navigate(-1)
    }

    
    // console.log(location)
  return (
    <div className={styles.payment}>
    <h2>Payment</h2>
    <h3>Selected tickets:</h3>
    <div className='ticketcard' style={{ display: "flex", flexWrap:"wrap", marginLeft:"2rem"}} >
    {display}
    </div>
    <hr></hr>
    <h5>Sub-total: {total} ₹</h5>
    <h5>Booking-fee: 50 ₹</h5>
    <hr></hr>
    <h5>Final amount: {amount} ₹</h5>
    <div className={styles.buttons} style={{display: "flex", flexWrap:"wrap", marginLeft:"35%", marginTop:"2rem"}}>
      {/* <button type='submit' name='cancle'>Cancle</button> */}
      <button type="submit" className={styles.descbtn} onClick={handlePay}>Pay</button>  
      <button type="submit" onClick={handleCancle} className={styles.descbtn}>Cancel</button>  
    </div>
    </div>
  )
}

export default Payment
