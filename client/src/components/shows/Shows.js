import React from 'react'
import { useState, useEffect } from 'react'

const Shows = () => {
    const [show, setShow] = useState([{
        movie:"",
        timing:"",
        price:"",
        theatreName:""
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
            {/* <p>{item.movie}</p> */}
            <p>{item.timing}</p>
            <p>{item.price}</p>
            </div>
        )
      })
  return (
    <div>
      {display}
    </div>
  )
}

export default Shows
