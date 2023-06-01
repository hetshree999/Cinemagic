import React, {useEffect, useState} from "react"
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import styles from '../movie/description.module.css'
import 'react-toastify/dist/ReactToastify.css';

const History = () => {
    const id = localStorage.getItem("userid");
    const [movie, setMovie] = useState([{
        moviename:"",
        theatrename:"", 
        showtime:"",
        bookingdate:"",
        showdate:"",
        normalprice:"",
        executiveprice:"",
        premiumprice:"",
        totalprice:"",
        seatnumber:[],
        userid:""
    }])

    //   const setValue = ({currentTarget: input}) => {
    //     setUser({...user, [input.name]:input.value})
    // }

    const display = movie.map((m)=>{
        console.log(m);
        return(
          <>
            <tbody style={{border:'1px solid black'}}>
              <tr key={m._id} style={{border:'1px solid black'}}>
                  <td style={{border:'1px solid black', color:'black'}}>{m.moviename} </td>
                  <td style={{border:'1px solid black', color:'black'}}>{m.theatrename}</td>
                  <td style={{border:'1px solid black', color:'black'}}>{m.showtime}</td>
                  <td style={{border:'1px solid black', color:'black'}}>{m.bookingdate.split("T")[0]} </td>
                  <td style={{border:'1px solid black', color:'black'}}>{m.showdate.split("T")[0]}</td>
                  <td style={{border:'1px solid black', color:'black'}}>
                  {
                    m.seatnumber.map((s)=>{
                        return(
                            <tr>{s}</tr>
                        )
                    })
                  }
                  </td>
                  {/* <td style={{border:'1px solid black', color:'black'}}>{m.bookingprice}</td> */}
                  <td style={{border:'1px solid black', color:'black'}}>{m.totalprice}</td>
                  {/* <td style={{border:'1px solid black', color:'black'}}>{m.seatnumber}</td> */}
              </tr>
            </tbody>
          </>
        )
      })

    const fetchData = async () => {
        // const id = localStorage.getItem("userid");
        const res = await fetch("http://localhost:5000/findHistory/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        console.log(data.bookings)
        // setUser({name:data.user.name, email:data.user.email})
        setMovie(data.bookings)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return(
        <>
        <div>
          <center><h1>Past bookings</h1></center>
        </div>
        {/* <input type="submit" className="btn" value="View Theater Admin requets"/> */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Movie Name</th>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Thaetre Name</th>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Show Time</th>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Booking date</th>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Show date</th>
                  {/* <th style={{border:'1px solid black', color:'black'}} scope="col">Booking price</th> */}
                  <th style={{border:'1px solid black', color:'black'}} scope="col">seat number</th>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Total Price</th>
                  {/* <th style={{border:'1px solid black', color:'black'}} scope='col'>Options</th> */}
                </tr>
              </thead>
              {display}
            </table>
            <center>
            <NavLink to='/home' className={styles.descbtn}>Back</NavLink> 
            </center>  
        </>
    )
}

export default History