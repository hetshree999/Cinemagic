import React, { useEffect } from 'react'

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
      <h1>Welcome</h1>
    </div>
  )
}

export default Home
