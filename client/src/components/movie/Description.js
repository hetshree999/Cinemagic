import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Description = () => {

  const [movie,setMovie] = useState({
    movieName:"",
    date:"",
    duration:"",
    description:"",
    genre:"",
    certificate:"",
    dimensions:"",
  })

  const path = window.location.pathname
  const array = path.split("/")
  const id = array[2]
  console.log(id)

  const getData = async() => {
    const data = await fetch("http://localhost:5000/getDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        id
      })
    })
    const res = await data.json();
    console.log(res)
    if(res.status === 201){
      setMovie(res.detail)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 1000)
  }, [])

  return (
    <div>
      <img  src={`http://localhost:5000/image/${movie?.image}`} alt="No"/>
      <p>{movie.movieName}</p>
      <p>{movie.description}</p>
      <p>{movie.date}</p>
      <p>{movie.certificate}</p>
      <p>{movie.dimensions}</p>
      <p>{movie.duration}</p>
      <NavLink to={`/shows/${movie.movieName}`}>Book show</NavLink>
    </div>
  )
}

export default Description
