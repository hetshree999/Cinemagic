import React from 'react'
import { useState } from 'react'
import styles from './seat.module.css'

const Book = () => {
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
                      
    const booked = ["A1", "A3", "A4"]
    const [seat, setSeat] = useState([])

    const[status, setStatus] = ("")

    function check(value){
      if(booked.includes(value)) {
        setStatus("disabled")
      }
      else{
        setStatus("")
      }
    }
    

    const getSeat = (e) => {
        const {value, checked} = e.target
        if(checked){
          setSeat([...seat, value])
        } else {
          setSeat(seat.filter((e) => e !== value))
        }
    }
    // console.log(seat)

    const submitForm = (e) => {
        e.preventDefault()
        console.log(seat)
    }

    const display = seatValue.map((i) => {
      if(booked.includes(i)){
      return(
        <div className={styles.group}>
        <input className={styles.cb} type="checkbox" value={i} onChange={(e) => getSeat(e)} disabled/>
        <label></label>
        </div>
      )
      } else {
        return(
        <div className={styles.group}>
        <input className={styles.cb} type="checkbox" value={i} />
        </div>
        )
      }
    })
    
  return (
    <div>
    <form onSubmit={submitForm}>
      {display}
    </form>
    </div>
  )
}

export default Book



// ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10",
//                       "B1","B2","B3","B4","B5","B6","B7","B8","B9","B10",
//                       "C1","C2","C3","C4","C5","C6","C7","C8","C9","C10",
//                       "D1","D2","D3","D4","D5","D6","D7","D8","D9","D10",
//                       "E1","E2","E3","E4","E5","E6","E7","E8","E9","E10",
//                       "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10",
//                       "G1","G2","G3","G4","G5","G6","G7","G8","G9","G10",
//                       "H1","H2","H3","H4","H5","H6","H7","H8","H9","H10",
//                       "I1","I2","I3","I4","I5","I6","I7","I8","I9","I10",
//                       "J1","J2","J3","J4","J5","J6","J7","J8","J9","J10"]