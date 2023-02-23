import React, {useState} from 'react'
// import './astyle.css'
import axios from 'axios';

const AdminHome = () => {
  const user = localStorage.getItem("uaerdatatoken")
  console.log(user);
  const[request, setRequest] = useState([''])
  const[clicked, setClicked] = useState(false)
  function handleSubmit(e){
    e.preventDefault();
    axios.get("http://localhost:5000/getRequest")
      .then(function(response){
        console.log("Data fetched")
        setClicked(true)
        setRequest(response.data)
      })
      .catch(function(error){
        console.log(error)
      })
  }

  const Approve = () => {
    console.log("Approve");
  }

  const Decline = () => {
    console.log("Decline");
  }

  const display = request.map((item)=>{
    return(
      <>
      {/* <div className='card-deck'>
        <div className='row'>
        <div className='col-sm-6'>
      <div className='card' style={{width: '40rem', height:'15rem', padding:'1.5rem'}}> */}
        <h4> Name: {item.tname} </h4>
        <h5> Email: {item.temail}</h5>
        <input type="button" value="Decline" onClick={Decline}/>
        <input type="button" value="Approve" onClick={Approve}/>
        {/*<h5> State: {item.state}</h5>
        <h5> City: {item.city}</h5>
        <h5> Description: {item.description}</h5> */}
        {/* </div>
        </div>
      </div>
      </div> */}
      </>
    )
  })

    return (
      <>
        <div>
          <h1>Welcome Admin</h1>
          {/* <button value="View Theater admin Requests"></button> */}
        </div>
        <input type="submit" className="btn" value="View Theater Admin requets" onClick={handleSubmit}/>
        { clicked && display}
        </>
      )
}

export default AdminHome