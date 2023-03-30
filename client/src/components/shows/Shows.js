import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./shows.module.css"
import Navbar from '../navbar/Navbar'

const Shows = () => {
    const [shows, setShow] = useState([{
        movie:"",
        show:[],
        theatreName:"",
        date:""
    }])

    const [showdate, setShowdate] = useState('')

    const setValue = ({currentTarget: input}) => {
        setShowdate(input.value)
    }

    // const [seat, setSeat] = useState(0)

    const path = window.location.pathname
    const array = path.split("/")
    const name = array[2]

    const getData = async(e) => {
      e.preventDefault()
        const data = await fetch("http://localhost:5000/getShows", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            name, showdate
          })
        })
        const res = await data.json();
        console.log(res)
        if(res.status === 201){
          setShow(res.detail)
        }
      }

    useEffect(() => {
          getData()
          var today = new Date().toISOString().split('T')[0];
          console.log(today);
          document.getElementsByName("date")[0].setAttribute('min', today);
      }, [])

      // console.log(seat)

      const display = shows.map((item, index) => {
        return(
          <center>
            <tr>
              <td>
            <p key={index} style={{color:"black"}}>{item.theatreName}</p>
            </td>
            {
              item.show.map((x, sIndex) => {return(<td ><div key={sIndex}><NavLink to={`/book/${item.movie}/${item.theatreName}/${x.timing}/${showdate}`}
              style={{color:"black"}}>{x.timing}</NavLink></div></td>)})
            }
            </tr>
          </center>
        )
      })
  return (
    <center>
    <div className={styles.date}>
      {/* <Navbar /> */}
      <form onSubmit={getData}>
      {/* <input type="date" name="date" onChange={setValue} ></input> */}
      <div className={styles.heading}>
      <h3>Select date</h3>
      </div>
      <input type="date" name="date" onChange={setValue} />
      {/* <input type="text" name="seat" value={seat} onChange={(e) => setSeat(e.target.value)}></input> */}
      <button type='submit' style={{marginLeft:"1rem"}}>search</button>
      <hr style={{width:"100%"}}></hr>
      </form>
      {display}
    </div>
    </center>
  )
}

export default Shows
