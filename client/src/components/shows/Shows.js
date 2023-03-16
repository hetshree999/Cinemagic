import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
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
        setTimeout(() => {
          getData()
        }, 1000)
      }, [])

      // console.log(seat)

      const display = shows.map((item, index) => {
        return(
            <div>
            <p key={index}>{item.theatreName}</p>
            {
              item.show.map((x, sIndex) => {return(<div key={sIndex}><NavLink to={`/book/${item.movie}/${item.theatreName}/${x.timing}/${x.price}/${showdate}`}
              >{x.timing} - Rs.{x.price}</NavLink></div>)})
            }
            </div>
        )
      })
  return (
    <div>
      {/* <Navbar /> */}
      <form onSubmit={getData}>
      <input type="date" name="date" onChange={setValue} ></input>
      {/* <input type="text" name="seat" value={seat} onChange={(e) => setSeat(e.target.value)}></input> */}
      <button type='submit'>search</button>
      </form>
      {display}
    </div>
  )
}

export default Shows
