import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'

const Shows = () => {
    const [show, setShow] = useState([{
        movie:"",
        show:"",
        theatreName:"",
        date:""
}])

    const path = window.location.pathname
    const array = path.split("/")
    const name = array[2]

    const getData = async() => {
        const data = await fetch("http://localhost:5000/getShows", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            name
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

      const display = show.map((item) => {
        return(
            <div>
            <p>{item.theatreName}</p>
            {
              item.show.map((x) => <div><p>{x.timing} - {x.price}</p></div>)
            }
            
            </div>
        )
      })
  return (
    <div>
      {/* <Navbar /> */}
      {display}
    </div>
  )
}

export default Shows
