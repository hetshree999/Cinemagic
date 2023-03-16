import React, {useState} from 'react'
import './astyle.module.css'
import axios from 'axios';

const AdminHome = () => {
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

  const Approve = (id) => {
    axios.put("http://localhost:5000/approve/"+id)
    .then(function(response){
      console.log("Called");
    })
    .catch(function(error){
      console.log(error);
    })
    console.log(id);
    console.log("Approve");
  }

  const Decline = (id) => {
    axios.put("http://localhost:5000/decline/"+id)
    .then(function(response){
      console.log("Decline Called");
    })
    .catch(function(error){
      console.log(error);
    })
    console.log(id);
    console.log("Declined");
  }

  const display = request.map((item)=>{
    return(
      <>
        <tbody style={{border:'1px solid black'}}>
          <tr key={item._id} style={{border:'1px solid black'}}>
              <td style={{border:'1px solid black', color:'black'}}>{item.tname} </td>
              <td style={{border:'1px solid black', color:'black'}}>{item.temail}</td>
              <td style={{border:'1px solid black', color:'black'}}>{item.gstNum}</td>
              <td style={{border:'1px solid black', color:'black'}}><input type="button" value="Decline" onClick={() => Decline(item._id)}/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="button" value="Approve" onClick={() => Approve(item._id)}/></td>
          </tr>
        </tbody>
      </>
    )
  })

    return (
      <>
        <div>
          <center><h1>Welcome Admin</h1></center>
        </div>
        <input type="submit" className="btn" value="View Theater Admin requets" onClick={handleSubmit}/>
        { clicked && 
          <>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">TheaterName</th>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Email</th>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">GST Number</th>
                  <th style={{border:'1px solid black', color:'black'}} scope='col'>Options</th>
                </tr>
              </thead>
              {display}
            </table>
          </>
        }
      </>
    )
}

export default AdminHome